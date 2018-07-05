import React from 'react';

export default () => (
  <section className="signin">
    <h1>Sign in</h1>
    <form className="signin-form" action="post">
      <div className="signin-form__field">
        <input id="identification" type="text" className="signin-form__field--identification" name="identification"/>
        <label htmlFor="identification">Login or E-Mail</label>
      </div>
      <div className="signin-form__field">
        <input id="password" type="password" className="signin-form__field--password" name="password"/>
        <label htmlFor="password">Password</label>
      </div>
      <div className="signin-form__field">
        <button className="signin-form__submit" type="submit">Sign in</button>
      </div>
    </form>
  </section>
)