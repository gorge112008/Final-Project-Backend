export const recoverSend = {
  emailTemplate: function (email) {
    return `
    <!DOCTYPE html>
    <html
      lang="en"
      xmlns="http://www.w3.org/1999/xhtml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
    >
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="x-apple-disable-message-reformatting" />
        <title></title>
        <style>
          table,
          td,
          div,
          h1,
          p {
            font-family: Arial, sans-serif;
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0">
        <table
          role="presentation"
          style="
            width: 100%;
            border-collapse: collapse;
            border: 0;
            border-spacing: 0;
            background: #e3fae4;
          "
        >
          <tr>
            <td align="center" style="padding: 0">
              <table
                role="presentation"
                style="
                  width: 602px;
                  border-collapse: collapse;
                  border: 1px dashed #adabab;
                  border-spacing: 0;
                  text-align: left;
                  padding: 40px;
                "
              >
                <tr>
                  <td align="left" style="padding: 50px 20px">
                    <table
                      role="presentation"
                      style="
                        width: 80%;
                        border-collapse: collapse;
                        border: 1px solid #7e7e7e;
                        border-spacing: 0;
                        text-align: left;
                      "
                    >
                      <h1
                        align="center"
                        style="
                          color: rgb(4, 37, 142);
                          font-family: 'Times New Roman', Times, serif;
                        "
                      >
                        <u>RECOVERY PASSWORD DELIPASO</u>
                      </h1>
                      <div>
                        To reset the password for your ${email} account, 
                        click on the following link:
                      </div>
                      <br />
                      <div align="center">
                        <a
                          href="http://localhost:8080/recover"
                          style="color: #0000f7; text-decoration: underline;"
                          >--------------Click here for Recovery!----------------</a
                        >
                      </div>
                      <br />
                      <div align="left" style="color: #0000f7";>
                        Expiration time: 30 minutes.
                      </div>
                      <br />
                      <hr />
                      <div style="color: #d64cee">
                        If you didn't initiate this account recovery request, you
                        don't need to take any further action and can safely
                        disregard this email.
                      </div>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: #ff494c">
                    <table
                      role="presentation"
                      style="
                        width: 100%;
                        border-collapse: collapse;
                        border: 0;
                        border-spacing: 0;
                        font-size: 9px;
                        font-family: Arial, sans-serif;
                      "
                    >
                      <tr>
                        <td style="padding: 0; width: 50%" align="left">
                          <p
                            style="
                              margin: 0;
                              font-size: 14px;
                              line-height: 16px;
                              font-family: Arial, sans-serif;
                              color: #ffffff;
                            "
                          >
                            Delipaso&#174; , RestoDelivery 2023.<br /><a
                              href="http://localhost:8080/"
                              style="color: #ffffff; text-decoration: underline"
                              >Get into</a
                            >
                          </p>
                        </td>
    
                        <td style="padding: 0; width: 50%" align="right">
                          <table
                            role="presentation"
                            style="
                              border-collapse: collapse;
                              border: 0;
                              border-spacing: 0;
                            "
                          >
                            <tr>
                              <td style="padding: 0 0 0 10px; width: 38px">
                                <a
                                  href="https://twitter.com/XxGorgeC4xX"
                                  style="color: #ffffff"
                                  ><img
                                    src="https://assets.codepen.io/210284/tw_1.png"
                                    alt="Twitter"
                                    width="38"
                                    style="height: auto; display: block; border: 0"
                                /></a>
                              </td>
                              <td style="padding: 0 0 0 10px; width: 38px">
                                <a
                                  href="https://www.facebook.com/xGorgeS4x/"
                                  style="color: #ffffff"
                                  ><img
                                    src="https://assets.codepen.io/210284/fb_1.png"
                                    alt="Facebook"
                                    width="38"
                                    style="height: auto; display: block; border: 0"
                                /></a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`;
  },
};
