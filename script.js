      document.addEventListener("DOMContentLoaded", () => {
        gsap.registerPlugin(ScrollTrigger);

        const ENCODED_PASSCODE = "ODA4ODA4";
        const TARGET_URL =
          "https://rayaantasnim.github.io/AEGIS-Medical-Island/RoyalAttires.html";
        const MAX_ATTEMPTS = 3;
        let attemptsCount = 0;

        const formInputs = {
          name: document.getElementById("user-name"),
          age: document.getElementById("user-age"),
          email: document.getElementById("user-email"),
          checkbox: document.getElementById("nda-checkbox"),
          submitBtn: document.getElementById("btn-submit-nda"),
        };

        const errors = {
          name: document.getElementById("name-error"),
          age: document.getElementById("age-error"),
          email: document.getElementById("email-error"),
        };

        const ndaCard = document.getElementById("nda-card");
        const otpModal = document.getElementById("otp-modal");
        const otpCard = document.getElementById("otp-card");
        const otpInputs = Array.from(document.querySelectorAll(".otp-input"));
        const otpMessage = document.getElementById("otp-message");
        const btnCheckOtp = document.getElementById("btn-check-otp");
        const attemptsLeftSpan = document.getElementById("attempts-left");

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Initial Entrance Animation
        gsap.from(".form-element", {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        });

        // Parallax Effects via ScrollTrigger
        gsap.to("#glow-1", {
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
          x: 100,
          y: -50,
          scale: 1.2,
        });

        gsap.to("#glow-2", {
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
          },
          x: -120,
          y: 80,
          scale: 1.15,
        });

        // Form Reactive Validation Engine
        function validateForm() {
          const isNameValid = formInputs.name.value.trim().length > 0;
          const isAgeValid = parseInt(formInputs.age.value, 10) >= 18;
          const isEmailValid = emailRegex.test(formInputs.email.value.trim());
          const isNdaChecked = formInputs.checkbox.checked;

          toggleError(
            errors.name,
            !isNameValid && formInputs.name.value.length > 0,
          );
          toggleError(
            errors.age,
            !isAgeValid && formInputs.age.value.length > 0,
          );
          toggleError(
            errors.email,
            !isEmailValid && formInputs.email.value.length > 0,
          );

          const isFormValid =
            isNameValid && isAgeValid && isEmailValid && isNdaChecked;

          if (isFormValid) {
            formInputs.submitBtn.removeAttribute("disabled");
            formInputs.submitBtn.className =
              "w-full py-3.5 px-6 rounded-lg font-bold text-sm tracking-wider uppercase transition-all duration-300 text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-pink-500 hover:brightness-125 shadow-neon-cyan cursor-pointer";
          } else {
            formInputs.submitBtn.setAttribute("disabled", "true");
            formInputs.submitBtn.className =
              "w-full py-3.5 px-6 rounded-lg font-bold text-sm tracking-wider uppercase transition-all duration-300 text-slate-400 bg-slate-800/60 border border-slate-700 cursor-not-allowed";
          }
        }

        function toggleError(element, show) {
          if (show) element.classList.remove("hidden");
          else element.classList.add("hidden");
        }

        ["input", "change"].forEach((eventType) => {
          formInputs.name.addEventListener(eventType, validateForm);
          formInputs.age.addEventListener(eventType, validateForm);
          formInputs.email.addEventListener(eventType, validateForm);
          formInputs.checkbox.addEventListener(eventType, validateForm);
        });

        // Transition: State 1 -> State 2
        formInputs.submitBtn.addEventListener("click", () => {
          if (formInputs.submitBtn.hasAttribute("disabled")) return;

          gsap.to(ndaCard, {
            duration: 0.6,
            opacity: 0,
            y: -30,
            scale: 0.95,
            filter: "blur(10px)",
            ease: "power2.inOut",
            onComplete: () => {
              ndaCard.classList.add("hidden");
              showOtpModal();
            },
          });
        });

        function showOtpModal() {
          otpModal.classList.remove("pointer-events-none");
          gsap.to(otpModal, { opacity: 1, duration: 0.4 });
          gsap.to(otpCard, {
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            onComplete: () => otpInputs[0].focus(),
          });
        }

        // OTP Input UX Logic (Auto Focus Shift & Backspace Navigation)
        otpInputs.forEach((input, index) => {
          input.addEventListener("input", (e) => {
            const value = e.target.value;
            if (value.length === 1) {
              if (index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
              } else {
                verifyPasscode();
              }
            }
          });

          input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace") {
              if (input.value === "" && index > 0) {
                otpInputs[index - 1].focus();
                otpInputs[index - 1].value = "";
              } else {
                input.value = "";
              }
            }
          });

          input.addEventListener("paste", (e) => {
            e.preventDefault();
            const pasteData = (e.clipboardData || window.clipboardData)
              .getData("text")
              .trim();
            if (/^\d{6}$/.test(pasteData)) {
              pasteData.split("").forEach((char, i) => {
                if (otpInputs[i]) otpInputs[i].value = char;
              });
              otpInputs[5].focus();
              verifyPasscode();
            }
          });
        });

        // Manual Showcase Button Trigger
        btnCheckOtp.addEventListener("click", verifyPasscode);

        // Verification & Max 3 Attempts Logic
        function verifyPasscode() {
          if (attemptsCount >= MAX_ATTEMPTS) return;

          const userEnteredCode = otpInputs
            .map((input) => input.value)
            .join("");
          if (userEnteredCode.length !== 6) {
            otpMessage.className =
              "text-xs font-semibold text-amber-400 font-mono";
            otpMessage.textContent = "ENTER COMPLETE 6-DIGIT CIPHER.";
            return;
          }

          const encodedInput = btoa(userEnteredCode);

          if (encodedInput === ENCODED_PASSCODE) {
            // Success State
            otpMessage.className =
              "text-xs font-semibold text-emerald-400 animate-pulse font-mono";
            otpMessage.textContent = "ACCESS GRANTED. AUTHORIZING TRANSFER...";

            otpInputs.forEach((inp) => {
              inp.classList.remove("border-slate-700/80", "border-red-500");
              inp.classList.add("border-emerald-400", "shadow-glow");
            });

            btnCheckOtp.classList.add("pointer-events-none", "opacity-50");

            gsap
              .timeline()
              .to(otpCard, { scale: 1.05, duration: 0.3, ease: "power1.out" })
              .to("body", {
                opacity: 0,
                duration: 0.8,
                ease: "power3.inOut",
                onComplete: () => {
                  window.location.href = TARGET_URL;
                },
              });
          } else {
            // Failed Attempt Handling
            attemptsCount++;
            const remaining = MAX_ATTEMPTS - attemptsCount;
            attemptsLeftSpan.textContent = remaining;

            // Shake feedback
            gsap.fromTo(
              otpCard,
              { x: -10 },
              {
                x: 10,
                duration: 0.08,
                repeat: 5,
                yoyo: true,
                ease: "power1.inOut",
                onComplete: () => {
                  gsap.set(otpCard, { x: 0 });
                },
              },
            );

            otpInputs.forEach((inp) => {
              inp.classList.remove("border-slate-700/80");
              inp.classList.add("border-red-500");
            });

            if (attemptsCount >= MAX_ATTEMPTS) {
              // Lockout State
              otpMessage.className =
                "text-xs font-semibold text-red-500 font-mono tracking-widest";
              otpMessage.textContent = "SYSTEM LOCKED. MAX ATTEMPTS EXCEEDED.";

              btnCheckOtp.setAttribute("disabled", "true");
              btnCheckOtp.className =
                "w-full py-3 px-6 rounded-xl font-bold text-xs tracking-widest uppercase text-slate-500 bg-slate-900 border border-slate-800 cursor-not-allowed";

              otpInputs.forEach((inp) => {
                inp.disabled = true;
                inp.classList.add("bg-red-950/30", "opacity-50");
              });
            } else {
              // Retry Warning
              otpMessage.className =
                "text-xs font-semibold text-red-400 font-mono";
              otpMessage.textContent = `INVALID CIPHER. ${remaining} RE-TRIES REMAINING.`;

              setTimeout(() => {
                otpInputs.forEach((inp) => {
                  inp.value = "";
                  inp.classList.remove("border-red-500");
                  inp.classList.add("border-slate-700/80");
                });
                otpInputs[0].focus();
                otpMessage.textContent = "";
              }, 1200);
            }
          }
        }
      });
