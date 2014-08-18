var url = "https://x.bitcoin.co.id/";
var webPage = require('webpage');
var fs = require('fs');
var page = webPage.create();
var data = {};
var threshold = 7000000;

page.open(url, function(status) {
	var price = page.evaluate(function() {
		return $('#kurs_beli').html();
	});
	var pesan_sms = "Harga BTC = Rp " + price;
	data.kirim_sms = 0;
	data.price = price;
	var harga_min = price.replace(/\./g, '');
	if (harga_min >= threshold) {
		data.kirim_sms = 1;
		data.isi_sms = pesan_sms;
	}
	var d = new Date();
	fs.write('log.txt', d.toString() + '\n' + pesan_sms + '\n\n', 'a');
	console.log(JSON.stringify(data));
	phantom.exit();
});