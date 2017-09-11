export default function(app){
	app.get('/test',function(req,res){
		res.json({test:'123'});
	});
}