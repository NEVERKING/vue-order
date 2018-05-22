var express = require('express');
var cookieParser = require('cookie-parser')
var app = express();
var axios = require('axios')

app.use('/static', express.static('./dist/static'));
app.use(cookieParser())
app.get('*', function (req, res) {
  if (!req.cookies.openId) {
    res.redirect(`http://order.voltmao.com/api/wechat/authorize?returnUrl=${window.location.href}`);
  } else {
    res.sendfile('./dist/index.html');
  }
});
// export const authorizeApi = ({returnUrl}) => {
//   return axios.post(`/wechat/authorize?returnUrl=${returnUrl}`)
// }

var server = app.listen(8090, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
