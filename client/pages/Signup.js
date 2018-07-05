import React from 'react';

export default () => (
  <section className="singup">
    <h1>Sign up</h1>
    <form className="signup-form" action="post">
      <div className="signup-form__field">
        <input id="identification" type="text" className="signup-form__field--identification" name="identification"/>
        <label htmlFor="identification">Login</label>
      </div>
      <div className="signup-form__field">
        <input id="email" type="email" className="signup-form__field--email" name="email"/>
        <label htmlFor="email">E-Mail</label>
      </div>
      <div className="signup-form__field">
        <input id="password" type="password" className="signup-form__field--password" name="password"/>
        <label htmlFor="password">Password</label>
      </div>
      <div className="signup-form__field">
        <input id="confirm" type="password" className="signup-form__field--confirm" name="confirm"/>
        <label htmlFor="confirm">Confirm password</label>
      </div>
      <div className="signup-form__field">
        <button className="signup-form__submit" type="submit">Sign up</button>
      </div>
    </form>
  </section>
)