'use client'

import { useState } from 'react'

import type { AuthFormState } from 'nucleify'

import type { AppFramework } from './app_framework'
import { assertAppFramework } from './app_framework'

export function createAuthFormState<
  TLogin extends object,
  TRegister extends object,
>(
  framework: AppFramework,
  initialLogin: TLogin,
  initialRegister: TRegister
): AuthFormState<TLogin, TRegister> {
  assertAppFramework(framework, 'next')

  const [loginFields, setLoginFields] = useState(initialLogin)
  const [registerFields, setRegisterFields] = useState(initialRegister)

  return {
    loginFields,
    setLoginFields,
    registerFields,
    setRegisterFields,
  }
}
