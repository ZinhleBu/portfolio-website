/** @format */

import * as React from "react";

interface EmailTemplateProps {
  email: string;
}

export const UserEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,

}) => (
  <div>
    <h1>{email} has sent you an email</h1>
  </div>
);

export default UserEmailTemplate;
