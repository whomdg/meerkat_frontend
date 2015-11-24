//The javascript in this file depends on data loaded in the file dataLoader.js

//This method is called when wishing to filter by location.
function loadLocation( nodeID ){

	//Record the page history.
	currentState = { type: history.state.type, dataID: history.state.dataID, locID: nodeID };
	var url = nodeID == 1 ? currentState.dataID : currentState.dataID + '/loc_' + nodeID;
	history.pushState( currentState, $( '#'+currentState.tabID ).text(), '/technical/' + url );

	loadLocationContent( nodeID );
}

//This method draws the location selector for any given node in the location tree.
function loadLocationContent( nodeID ){

	var node = locations.first( {strategy: 'breadth'}, function(x){ return x.model.id===nodeID; });

	//Get the parents
	var nodePath = node.getPath();

	//Get children
	var childNodes = node.model.nodes; 

	//Build the location selector
	var html = "";

	if( nodePath.length > 1 ){
		html += "<div class='btn-group-vertical btn-block'>";
		html += "<button type='button' class='btn header'>Parent Locations:</button>";
		for( var i=0; i<nodePath.length-1; i++ ){
			html += "<button type='button' class='btn btn-default btn-block' onclick='loadLocation(" +
				          nodePath[i].model.id + ");'>" + nodePath[i].model.text + "</button>";
		}
		html += "</div>";
	}

	if( childNodes.length > 0){
		html += "<div class='btn-group-vertical btn-block'>";
		html += "<button type='button' class='btn header'>Sub-locations:</button>";
		for( var j=0; j<childNodes.length; j++ ){
			html += "<button type='button' class='btn btn-default' onclick='loadLocation(" +
				          childNodes[j].id + ");'>"+childNodes[j].text+"</button>";
		}
		html += "</div>";
	}

	//Draw the location selector and update the location title.
	$("#location-selector").html(html);
	$("#location-title").text( node.model.text );

}



