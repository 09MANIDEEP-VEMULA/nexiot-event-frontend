export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
 
export const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};
 
export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};
 
export const validateTeamSize = (teamSize) => {
  return teamSize >= HACKATHON_CONFIG.minTeamSize && teamSize <= HACKATHON_CONFIG.maxTeamSize;
};
 
export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const rule = rules[field];
    const value = formData[field];
 
    if (rule.required && !value) {
      errors[field] = `${field} is required`;
    }
 
    if (rule.type === 'email' && value && !validateEmail(value)) {
      errors[field] = 'Invalid email format';
    }
 
    if (rule.type === 'phone' && value && !validatePhone(value)) {
      errors[field] = 'Invalid phone number';
    }
 
    if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `Minimum ${rule.minLength} characters required`;
    }
 
    if (rule.maxLength && value && value.length > rule.maxLength) {
      errors[field] = `Maximum ${rule.maxLength} characters allowed`;
    }
  });
 
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
 