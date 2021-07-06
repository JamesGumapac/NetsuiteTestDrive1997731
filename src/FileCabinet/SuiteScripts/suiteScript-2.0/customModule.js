define([], function()
{
	function showMessage()
	{
		alert('hello from the other module');
	}
	return
	{
		Sabrin: showMessage
	};
});