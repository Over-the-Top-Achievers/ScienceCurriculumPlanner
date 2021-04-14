var server = app.listen(8080, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`Listening at http://${host}:${port}`);
})