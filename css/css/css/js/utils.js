/**
 * IRAQ GREEN — Shared Utilities
 * -----------------------------------------------------------------------
 * Framework-free helper functions reused across every page of the app.
 * Keep this file free of any page-specific logic — page behaviour
 * belongs in that page's own [page-name].js file.
 *
 * Exposed on a single global namespace (`IG`) so every page can call
 * these helpers without a bundler or module system:
 *
 *   IG.showToast('تم الحفظ بنجاح');
 *   IG.isValidEmail('a@b.com');
 * ------------------------------------------------------------------- */

const IG = (() => {
  /**
   * Show a short-lived toast message at the bottom of the screen.
   * @param {string} message - Text to display.
   * @param {'success'|'error'} [type='success'] - Visual style.
   * @param {number} [duration=2600] - Milliseconds before it hides.
   */
  function showToast(message, type = 'success', duration = 2600) {
    let toast = document.querySelector('.ig-toast');

    // Create the toast element once, then reuse it for every call.
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'ig-toast';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.toggle('ig-toast--error', type === 'error');

    // Restart the animation/visibility cleanly even if a toast is already showing.
    requestAnimationFrame(() => {
      toast.classList.add('ig-toast--visible');
    });

    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => {
      toast.classList.remove('ig-toast--visible');
    }, duration);
  }

  /**
   * Basic email format check. Not exhaustive by design —
   * real verification will happen server-side once the backend exists.
   * @param {string} value
   * @returns {boolean}
   */
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
  }

  /**
   * Minimum password length check.
   * @param {string} value
   * @param {number} [minLength=6]
   * @returns {boolean}
   */
  function isValidPassword(value, minLength = 6) {
    return String(value).length >= minLength;
  }

  /**
   * Marks a field wrapper as invalid/valid and shows/hides its error text.
   * Expects the markup pattern used by .ig-field across the app.
   * @param {HTMLElement} fieldEl - The `.ig-field` wrapper element.
   * @param {boolean} isValid
   */
  function setFieldValidity(fieldEl, isValid) {
    fieldEl.classList.toggle('ig-field--invalid', !isValid);
    const input = fieldEl.querySelector('.ig-input');
    if (input) input.classList.toggle('ig-input--error', !isValid);
  }

  /**
   * Toggles a password input between hidden and visible characters.
   * Also swaps the eye / eye-off icon inside the trigger button.
   * @param {HTMLInputElement} inputEl
   * @param {HTMLElement} triggerEl - The icon button that was clicked.
   */
  function togglePasswordVisibility(inputEl, triggerEl) {
    const isHidden = inputEl.type === 'password';
    inputEl.type = isHidden ? 'text' : 'password';
    triggerEl.setAttribute('aria-label', isHidden ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور');
    triggerEl.classList.toggle('is-visible', isHidden);
  }

  /**
   * Puts a button into/out of its loading state (spinner + disabled).
   * @param {HTMLButtonElement} buttonEl
   * @param {boolean} isLoading
   */
  function setButtonLoading(buttonEl, isLoading) {
    buttonEl.classList.toggle('is-loading', isLoading);
    buttonEl.disabled = isLoading;
  }

  return {
    showToast,
    isValidEmail,
    isValidPassword,
    setFieldValidity,
    togglePasswordVisibility,
    setButtonLoading,
  };
})();
