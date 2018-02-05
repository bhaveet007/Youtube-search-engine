//searchbar handler
$ (function(){
    var searchField = $('#query');
    var icon = $('#search-btn');
    
    //Focus handler
    $(searchField).on('focus',function() {
        $(this).animate( {
            width:'100%'
            
        },400);
        $(icon).animate({
            right:'10px'
        },400);
        
    });
    //blur event handler
    $(searchField).on('blur',function(){
        if(serchField.val() == ''){
            $(searchField).animate({
                width:'45%'
                
            },400,function(){});
            $(icon).animate({
                right:'360px'
            },400,function(){});
        }
    });
    $('#search-form').submit(function(e){
                             e.preventDefault();
                            
});
})
function search(){
    //clear Results
    $('#results').html('');
    $('#buttons').html('');
    // get form input
    q=$('#query').val();
    //Run GET Request onAPI
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part: 'snippet,id',
            q:q,
            type:'video',
            key:'AIzaSyCvk3NNMQASZgFkCNxIp9jH-18o0PXhDUo'},
            function(data){
                var nextPageToken=data.nextPageToken;
                var prevPageToken=data.prevPagetoken;
                console.log(data);
                $.each(data.items function(i,item){
                    var output=getOutput(item);
                    //Display results
                    $.('#results').append(output);
                    
                });
                
                var buttons=getButtons(prevPagetoken,nextPageToken);
                //display buttons
                $('#buttons').append(buttons);
            }
            
        
    
} ;
        }
//Next page function
function nextpage(){
    var token=$('#next-button').data('token');
    var query=$('#next-button').data('query');
    $('#results').html('');
    $('#buttons').html('');
    // get form input
    q=$('#query').val();
    //Run GET Request onAPI
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part: 'snippet,id',
            q:q,
            pageToken:token,
            type:'video',
            key:'AIzaSyCvk3NNMQASZgFkCNxIp9jH-18o0PXhDUo'},
        function(data){
            var nextPageToken=data.nextPageToken;
            var prevPageToken=data.prevPagetoken;
            console.log(data);
            $.each(data.items function(i,item){
                var output=getOutput(item);
                //Display results
                $.('#results').append(output);

            });

            var buttons=getButtons(prevPagetoken,nextPageToken);
            //display buttons
            $('#buttons').append(buttons);
        }



} ;
}
//prev page function
function prevpage(){
    var token=$('#prev-button').data('token');
    var query=$('#prev-button').data('query');
    $('#results').html('');
    $('#buttons').html('');
    // get form input
    q=$('#query').val();
    //Run GET Request onAPI
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part: 'snippet,id',
            q:q,
            pageToken:token,
            type:'video',
            key:'AIzaSyBHm3FrtZ8CoScVKyc_Cbn4HYJhvN-9Ktg'},
        function(data){
            var nextPageToken=data.nextPageToken;
            var prevPageToken=data.prevPagetoken;
            console.log(data);
            $.each(data.items function(i,item){
                var output=getOutput(item);
                //Display results
                $.('#results').append(output);

            });

            var buttons=getButtons(prevPagetoken,nextPageToken);
            //display buttons
            $('#buttons').append(buttons);
        }



} ;
}
//build output
function getOutput(item){
        var videoId=item.id.videoId;
        var title=item.snippet.title;
        var description=item.snippet.description;
        var thumb=item.snippet.thumbnails.high.url;
        var channelTitle=item.snippet.channelTitle;
        var videoDate=item.snippet.publishedAt;
    //Buils a output string
        var output='<li>'+
            '<div class="list-left'>+
            '<img src="'+thumb+'">'+
            '<div class="list-right">'+
            '<h3>'+title+'</h3>'+
        '<small>By <span class="cTitle">'+channelTitle+'</span> on'+videoDate+'<small>'+
            '<p>'+description+'<p>'+
            '</div>'+
            '</li>'+
            '<div class="clearfix"></div>'+
            '';
        return output;
    }
 //build the buttons
    function getButtons(prevPagetoken,nextPageToken){
        if(!prevPagetoken){
            var btnoutput='<div class="button-container>"'+
                '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'"data-query="'+q+'"'+'onclick="nextpage();">Next page</button><div>';
        }else{
               var btnoutput='<div class="button-container>"'+
                   ' <button id="next-button" class="paging-button" data-token="'+prevPageToken+'"data-query="'+q+'"'+'onclick="prevpage();">Prev page</button><div>'+
                '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'"data-query="'+q+'"'+ onclick="nextpage();">Next page</button><div>';
        }
        return btnoutput;
        
    }
    