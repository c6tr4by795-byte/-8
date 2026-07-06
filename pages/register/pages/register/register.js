/**
 * IRAQ GREEN — Register Screen Logic
 * -----------------------------------------------------------------------
 * Validates the sign-up form client-side and gives feedback. There is no
 * backend yet, so account creation itself is a clearly marked
 * placeholder — wire it up later without touching anything else here.
 * ------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');

  const fullNameField = document.getElementById('fullNameField');
  const fullNameInput = document.getElementById('fullName');

  const emailField = document.getElementById('emailField');
  const emailInput = document.getElementById('email');

  const passwordField = document.getElementById('passwordField');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('togglePassword');

  const confirmPasswordField = document.getElementById('confirmPasswordField');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');

  const provinceField = document.getElementById('provinceField');
  const provinceSelect = document.getElementById('province');

  const cityField = document.getElementById('cityField');
  const cityInput = document.getElementById('city');

  const registerButton = document.getElementById('registerButton');
  const googleButton = document.getElementById('googleButton');

  togglePasswordBtn.addEventListener('click', () => {
    IG.togglePasswordVisibility(passwordInput, togglePasswordBtn);
  });

  toggleConfirmPasswordBtn.addEventListener('click', () => {
    IG.togglePasswordVisibility(confirmPasswordInput, toggleConfirmPasswordBtn);
  });

  /** Marks a <select> as valid/invalid, mirroring IG.setFieldValidity for inputs. */
  function setSelectValidity(fieldEl, isValid) {
    fieldEl.classList.toggle('ig-field--invalid', !isValid);
    const select = fieldEl.querySelector('.ig-select');
    if (select) select.classList.toggle('ig-select--error', !isValid);
  }

  /** Validate the whole form; returns true only if every field passes. */
  function validateForm() {
    const fullNameValid = fullNameInput.value.trim().length >= 3;
    const emailValid = IG.isValidEmail(emailInput.value);
    const passwordValid = IG.isValidPassword(passwordInput.value, 6);
    const confirmValid = passwordValid && confirmPasswordInput.value === passwordInput.value;
    const provinceValid = provinceSelect.value !== '';
    const cityValid = cityInput.value.trim().length >= 2;

    IG.setFieldValidity(fullNameField, fullNameValid);
    IG.setFieldValidity(emailField, emailValid);
    IG.setFieldValidity(passwordField, passwordValid);
    IG.setFieldValidity(confirmPasswordField, confirmValid);
    setSelectValidity(provinceField, provinceValid);
    IG.setFieldValidity(cityField, cityValid);

    return fullNameValid && emailValid && passwordValid && confirmValid && provinceValid && cityValid;
  }

  // Clear a field's error state as soon as the user starts fixing it.
  fullNameInput.addEventListener('input', () => IG.setFieldValidity(fullNameField, true));
  emailInput.addEventListener('input', () => IG.setFieldValidity(emailField, true));
  passwordInput.addEventListener('input', () => IG.setFieldValidity(passwordField, true));
  confirmPasswordInput.addEventListener('input', () => IG.setFieldValidity(confirmPasswordField, true));
  provinceSelect.addEventListener('change', () => setSelectValidity(provinceField, true));
  cityInput.addEventListener('input', () => IG.setFieldValidity(cityField, true));

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validateForm()) {
      IG.showToast('يرجى تصحيح الحقول المميزة باللون الأحمر', 'error');
      return;
    }

    IG.setButtonLoading(registerButton, true);

    // ---------------------------------------------------------------
    // PLACEHOLDER — backend integration point.
    // Once an auth service exists, replace this block with a real
    // account-creation request, e.g.:
    //
    //   const newUser = await authService.register({
    //     fullName, email, password, province, city
    //   });
    //
    // The new user record will eventually be created with the fields
    // described in README.md (User ID, Total Trees, Total Points,
    // Current Level, Rank, Badges, Achievements — all starting at zero).
    // ---------------------------------------------------------------
    setTimeout(() => {
      IG.setButtonLoading(registerButton, false);
      IG.showToast('سيتم تفعيل إنشاء الحساب عند ربط الخادم');
    }, 900);
  });

  googleButton.addEventListener('click', () => {
    // PLACEHOLDER — Google sign-up will be wired up with the backend later.
    IG.showToast('التسجيل عبر Google سيتم تفعيله لاحقاً');
  });
});
