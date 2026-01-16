export default class AuthStyles {
  getEmailStyles = () => {
    return `
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #ffffff;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .email-header {
            background: linear-gradient(135deg, #2c8c99 0%, #1c5d66 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }

        .header-logo {
            font-size: 48px;
            margin-bottom: 20px;
        }

        .email-header h1 {
            color: white;
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }

        .email-body {
            padding: 40px 30px;
            color: #333;
            line-height: 1.6;
        }

        .email-body h2 {
            color: #1c5d66;
            margin-top: 0;
            font-size: 22px;
            font-weight: 600;
        }

        .email-body p {
            margin-bottom: 20px;
            font-size: 16px;
            color: #555;
        }

        .action-button {
            display: inline-block;
            background: linear-gradient(135deg, #2c8c99 0%, #1c5d66 100%);
            color: white !important;
            text-decoration: none;
            padding: 16px 40px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            margin: 25px 0;
            box-shadow: 0 8px 20px rgba(44, 140, 153, 0.25);
            transition: all 0.3s ease;
        }

        .action-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 25px rgba(44, 140, 153, 0.35);
        }

        .link-text {
            word-break: break-all;
            background-color: #f8f9fa;
            padding: 12px;
            border-radius: 8px;
            border-left: 4px solid #2c8c99;
            font-family: monospace;
            font-size: 14px;
            color: #333;
            margin: 20px 0;
        }

        .info-box {
            background-color: #e6f4f7;
            border-radius: 12px;
            padding: 20px;
            margin: 25px 0;
            border-left: 4px solid #2c8c99;
        }

        .info-box p {
            margin: 0;
            color: #2d3748;
            font-size: 14px;
        }

        .email-footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }

        .email-footer p {
            color: #6c757d;
            font-size: 14px;
            margin: 5px 0;
        }

        .expiry-note {
            color: #ff8c42;
            font-weight: 600;
        }

        `;
  };
}
