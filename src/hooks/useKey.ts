import type React from 'react'
import { useCallback, useEffect } from 'react'

const useKey = (
  key: string,
  action: () => void
): {
  onKeyUp: (
    evt: React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  ) => void
} => {
  return {
    onKeyUp: (
      evt: React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >
    ) => evt.key === key && action()
  }
}

export default useKey
