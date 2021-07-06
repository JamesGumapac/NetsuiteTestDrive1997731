/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       19 Aug 2017     lgawaran
 *
 */

/**
 * @pamallik {nlobjPortlet} portletObj Current portlet object
 * @pamallik {Number} column Column position index: 1 = left, 2 = middle, 3 = right
 * @returns {Void}
 */
function portletName(portletObj, column) {
	
	portletObj.setTitle("Inline Testing");
	var src = 'https://www.youtube.com/embed/UOxkGD8qRB4'
	//var css = '<style> #frameScale { width: 1390px; height: 2940px; padding: 0; position:relative; left:-90px; top:0px; overflow: hidden; }#frame { width: 1390px; height: 2940px; position:relative; left:-55px; top:0px; } #frame { -ms-zoom: 0.7; -moz-transform: scale(0.7); -moz-transform-origin: 0px 0; -o-transform: scale(0.7); -o-transform-origin: 0 0; -webkit-transform: scale(0.7); -webkit-transform-origin: 0 0; } </style>';
	var css = null;
	var url = css+'<iframe id="frameScale" width="854" height="480" src="'+src+'" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>'
	var content = "<img src='"+url+"'>";
	portletObj.setHtml(url)
//  <iframe width="720" height="405" src="https://www.youtube.com/embed/?listType=playlist&list=PLAYLIST_ID" frameborder="0" allowfullscreen>

}