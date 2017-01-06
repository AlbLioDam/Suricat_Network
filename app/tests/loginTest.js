describe('LinkDBCheckLogin', function()
{

	var LinkDBCheckLogin;
	var LinkDB;
	var $http;

	beforeEach(function()
	{
		angular.mock.module('Suricat')
		angular.mock.inject(function(_LinkDBCheckLogin_, $httpBackend, _LinkDB_)
		{
			LinkDBCheckLogin = _LinkDBCheckLogin_
			LinkDB 			 = _LinkDB_
			$http 			 = $httpBackend
		})
	})

	describe('#check', function()
	{

		// test check is a function
		it("should have an account", function()
		{
			expect(LinkDBCheckLogin.check).to.be.a('function')
		})

		/*it("Should call JSON for user id 1", function(){
			$http.expectJSONP(BaseURL + '1')
			LinkDB.getUserById('http://localhost:3000/user/1')
		}) */


/*
		// test if check return a json
		it("Should return a json object", function()
		{
			obj = {email: "lionel.chialvo@suricat.fr", password: "1234"};
			LinkDBCheckLogin.check(obj).then(function(response){
				expect(response.status).to.be.equal(0)
			})

		}) */

	});
})