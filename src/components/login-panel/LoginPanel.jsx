import React from 'react'
import { Formik }  from 'formik'

export const LoginPanel = () => {
  return (
    <div>
        <form>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <button type="submit">Login</button>
        </form>
    </div>
  )
}
