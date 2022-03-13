export default (url) => {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="https://www.w3.org/1999/xhtml">
    <head>
    <title>Confirm your subscription</title>
    <meta http–equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http–equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
    <!-- <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" rel="stylesheet"> -->
        <style  type="text/css">
    
        body {
            margin: 0 !important;
            padding: 0 !important;
            -webkit-text-size-adjust: 100% !important;
            -ms-text-size-adjust: 100% !important;
            -webkit-font-smoothing: antialiased !important;
        }
    
        .container {
            margin: 10px;
            text-align: left;
        }
        
        .container p {
            font-size: 19px;
            text-align: left !important;
        }
    
        .link {
            text-decoration: none;
            display: inline-block;
            padding: 10px;
            border-radius: 5px;
            margin-top: 5px;
            background: #3B82F6;
            color: #FFFFFF !important;
        }
    
        </style>
    </head>
    <body>
        <div class="container">
            <p>
                Hello, thank you for signing up! Could you please verify your email address so we can verify that you are the person signing up?
            </p>
            <a class="link" href=${url} target="_blank">
                Confirm your email
            </a>
        </div>
    </body>
    </html>
    `
}