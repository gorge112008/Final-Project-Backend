export const emailSend = {
  emailTemplate: function (name) {
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
    <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
    <![endif]-->
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
        background: #ffffff;
      "
    >
      <tr>
        <td align="center" style="padding: 0">
          <table
            role="presentation"
            style="
              width: 50%;
              border-collapse: collapse;
              border: 1px solid #cccccc;
              border-spacing: 0;
              text-align: left;
            "
          >
            <tr>
              <td
                align="center"
                style="padding: 20px 0 20px 0; background: #70bbd9"
              >
                <img
                  src="https://assets.codepen.io/210284/h1.png"
                  alt=""
                  width="300"
                  style="height: auto; display: block"
                />
              </td>
            </tr>
            <tr>
              <td style="padding: 36px 30px 42px 30px">
                <table
                  role="presentation"
                  style="
                    width: 100%;
                    border-collapse: collapse;
                    border: 0;
                    border-spacing: 0;
                  "
                >
                  <tr>
                    <td style="padding: 0 0 36px 0; color: #153643">
                      <h1
                        style="
                          font-size: 24px;
                          margin: 0 0 20px 0;
                          font-family: Arial, sans-serif;
                        "
                      >
                        Hi ${name} Welcome to Delipaso!!!
                      </h1>
                      <b
                        style="
                          margin: 0 0 12px 0;
                          font-size: 16px;
                          line-height: 24px;
                          font-family: Arial, sans-serif;
                        "
                        >We're happy you're here.
                      </b>
                      <p
                        style="
                          margin: 0 0 12px 0;
                          font-size: 16px;
                          line-height: 24px;
                          font-family: Arial, sans-serif;
                        "
                      >
                        We give you all the support you need to make your
                        purchases and orders with pleasure.
                      </p>
                      <p
                        style="
                          margin: 0 0 12px 0;
                          font-size: 16px;
                          line-height: 24px;
                          font-family: Arial, sans-serif;
                        "
                      >
                        If you have problems we will help you, you are at home.
                      </p>
                      <p
                        style="
                          margin: 0;
                          font-size: 16px;
                          line-height: 24px;
                          font-family: Arial, sans-serif;
                        "
                      >
                        <a
                          href="http://localhost:8080/products"
                          style="color: #ee4c50; text-decoration: underline"
                          >Let's make your first order</a
                        >
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0">
                      <table
                        role="presentation"
                        style="
                          width: 100%;
                          border-collapse: collapse;
                          border: 0;
                          border-spacing: 0;
                        "
                      >
                        <tr>
                          <td
                            style="
                              width: 260px;
                              padding: 0;
                              vertical-align: top;
                              color: #153643;
                            "
                          >
                            <p
                              style="
                                margin: 0 0 25px 0;
                                font-size: 16px;
                                line-height: 24px;
                                font-family: Arial, sans-serif;
                              "
                            >
                              <img
                                src="https://assets.codepen.io/210284/left.gif"
                                alt=""
                                width="260"
                                style="height: auto; display: block"
                              />
                            </p>
                            <p
                              style="
                                margin: 0 0 12px 0;
                                font-size: 16px;
                                line-height: 24px;
                                font-family: Arial, sans-serif;
                              "
                            >
                              Don't wait any longer to delight your palate with
                              our exquisite delivery food options! Let us be
                              your number one option when it comes to enjoying
                              delicious dishes without leaving home. Order now
                              and let yourself be carried away by the most
                              irresistible flavors!
                            </p>
                            <p
                              style="
                                margin: 0;
                                font-size: 16px;
                                line-height: 24px;
                                font-family: Arial, sans-serif;
                              "
                            >
                              <a
                                href="http://localhost:8080/home"
                                style="
                                  color: #ee4c50;
                                  text-decoration: underline;
                                "
                                >Do you want to explore our menu?</a
                              >
                            </p>
                          </td>
                          <td
                            style="
                              width: 20px;
                              padding: 0;
                              font-size: 0;
                              line-height: 0;
                            "
                          >
                            &nbsp;
                          </td>
                          <td
                            style="
                              width: 260px;
                              padding: 0;
                              vertical-align: top;
                              color: #153643;
                            "
                          >
                            <p
                              style="
                                margin: 0 0 25px 0;
                                font-size: 16px;
                                line-height: 24px;
                                font-family: Arial, sans-serif;
                              "
                            >
                              <img
                                src="https://assets.codepen.io/210284/right.gif"
                                alt=""
                                width="260"
                                style="height: auto; display: block"
                              />
                            </p>
                            <p
                              style="
                                margin: 0 0 12px 0;
                                font-size: 16px;
                                line-height: 24px;
                                font-family: Arial, sans-serif;
                              "
                            >
                              Don't wait more! Join our community chat and
                              discover everything we can do for you. We are
                              excited to help you and be a part of your
                              experience. We look forward to chatting with you
                              soon!
                            </p>
                            <p
                              style="
                                margin: 0;
                                font-size: 16px;
                                line-height: 24px;
                                font-family: Arial, sans-serif;
                              "
                            >
                              <a
                                href="http://localhost:8080/chat"
                                style="
                                  color: #ee4c50;
                                  text-decoration: underline;
                                "
                                >Do you want to chat with us?</a
                              >
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px; background: #ee4c50">
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
