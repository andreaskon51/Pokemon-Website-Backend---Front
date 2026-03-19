const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,30}$/

export interface ValidationError {
  field: string
  message: string
}

export function validateRegistration(
  username: string,
  email: string,
  password: string
): ValidationError[] {
  const errors: ValidationError[] = []

  if (!username || !username.trim()) {
    errors.push({ field: 'username', message: 'Username is required' })
  } else if (username.trim().length < 3) {
    errors.push({ field: 'username', message: 'Username must be at least 3 characters' })
  } else if (username.trim().length > 30) {
    errors.push({ field: 'username', message: 'Username must be at most 30 characters' })
  } else if (!USERNAME_REGEX.test(username.trim())) {
    errors.push({ field: 'username', message: 'Username can only contain letters, numbers, underscores, and hyphens' })
  }

  if (!email || !email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' })
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.push({ field: 'email', message: 'Invalid email format' })
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' })
  } else if (password.length < 8) {
    errors.push({ field: 'password', message: 'Password must be at least 8 characters' })
  } else if (password.length > 128) {
    errors.push({ field: 'password', message: 'Password must be at most 128 characters' })
  } else {
    if (!/[a-z]/.test(password)) {
      errors.push({ field: 'password', message: 'Password must contain at least one lowercase letter' })
    }
    if (!/[A-Z]/.test(password)) {
      errors.push({ field: 'password', message: 'Password must contain at least one uppercase letter' })
    }
    if (!/[0-9]/.test(password)) {
      errors.push({ field: 'password', message: 'Password must contain at least one number' })
    }
  }

  return errors
}

export function validateLogin(email: string, password: string): ValidationError[] {
  const errors: ValidationError[] = []

  if (!email || !email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' })
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' })
  }

  return errors
}

// Sanitize email: trim + lowercase
export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function sanitizeUsername(username: string): string {
  return username.trim()
}
