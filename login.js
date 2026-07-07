/**
 * IRAQ GREEN — Login Screen Logic
 * -----------------------------------------------------------------------
 * Handles only what belongs on this screen: reading the form, validating
 * it client-side, and giving the user feedback. There is no backend yet,
 * so the actual authentication call is a clearly marked placeholder —
 * wire it up later without touching anything else on this page.
 * ------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const emailField = document.getElementById('emailField');
  const emailInput = document.getElementById('email');
  const passwordField = document.getElementById('passwordField');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('togglePassword');
  const loginButton = document.getElementById('loginButton');
  const googleButton = document.getElementById('googleButton');
  const forgotPasswordLink = document.getElementById('forgotPasswordLink');
  const createAccountLink = document.getElementById('createAccountLink');

  /** Show/hide the password as plain text. */
  togglePasswordBtn.addEventListener('click', () => {
    IG.togglePasswordVisibility(passwordInput, togglePasswordBtn);
  });

  /** Validate the whole form; returns true only if every field passes. */
  function validateForm() {
    const emailValid = IG.isValidEmail(emailInput.value);
    const passwordValid = IG.isValidPassword(passwordInput.value, 6);

    IG.setFieldValidity(emailField, emailValid);
    IG.setFieldValidity(passwordField, passwordValid);

    return emailValid && passwordValid;
  }

  // Clear a field's error state as soon as the user starts fixing it.
  emailInput.addEventListener('input', () => IG.setFieldValidity(emailField, true));
  passwordInput.addEventListener('input', () => IG.setFieldValidity(passwordField, true));

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validateForm()) {
      IG.showToast('يرجى تصحيح الحقول المميزة باللون الأحمر', 'error');
      return;
    }

    IG.setButtonLoading(loginButton, true);

    // ---------------------------------------------------------------
    // PLACEHOLDER — backend integration point.
    // Once an auth service exists, replace this block with a real
    // sign-in request, e.g.:
    //
    //   const result = await authService.signIn(email, password);
    //
    // For now we only simulate a network delay so the interface can
    // be reviewed with realistic loading/success behaviour.
    // ---------------------------------------------------------------
    setTimeout(() => {
      IG.setButtonLoading(loginButton, false);
      IG.showToast('سيتم تفعيل تسجيل الدخول عند ربط الخادم');
    }, 900);
  });

  googleButton.addEventListener('click', () => {
    // PLACEHOLDER — Google sign-in will be wired up with the backend later.
    IG.showToast('تسجيل الدخول عبر Google سيتم تفعيله لاحقاً');
  });

  forgotPasswordLink.addEventListener('click', (event) => {
    event.preventDefault();
    // PLACEHOLDER — will navigate to pages/forgot-password/forgot-password.html
    IG.showToast('صفحة استعادة كلمة المرور قيد الإنشاء');
  });

  createAccountLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '../register/register.html';
  });
});
