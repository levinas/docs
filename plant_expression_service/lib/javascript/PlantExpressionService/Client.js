

function PlantExpression(url, auth, auth_cb) {

    var _url = url;

    var _auth = auth ? auth : { 'token' : '',
                                'user_id' : ''};
    var _auth_cb = auth_cb;


    this.get_repid_by_sampleid = function(ids)
    {
        var resp = json_call_ajax_sync("PlantExpression.get_repid_by_sampleid", [ids]);

        return resp[0];
    }

    this.get_repid_by_sampleid_async = function(ids, _callback, _error_callback)
    {
        json_call_ajax_async("PlantExpression.get_repid_by_sampleid", [ids], 1, _callback, _error_callback)
    }

    this.get_experiments_by_seriesid = function(ids)
    {
        var resp = json_call_ajax_sync("PlantExpression.get_experiments_by_seriesid", [ids]);

        return resp[0];
    }

    this.get_experiments_by_seriesid_async = function(ids, _callback, _error_callback)
    {
        json_call_ajax_async("PlantExpression.get_experiments_by_seriesid", [ids], 1, _callback, _error_callback)
    }

    this.get_experiments_by_sampleid = function(ids)
    {
        var resp = json_call_ajax_sync("PlantExpression.get_experiments_by_sampleid", [ids]);

        return resp[0];
    }

    this.get_experiments_by_sampleid_async = function(ids, _callback, _error_callback)
    {
        json_call_ajax_async("PlantExpression.get_experiments_by_sampleid", [ids], 1, _callback, _error_callback)
    }

    this.get_experiments_by_sampleid_geneid = function(ids, gl)
    {
        var resp = json_call_ajax_sync("PlantExpression.get_experiments_by_sampleid_geneid", [ids, gl]);

        return resp[0];
    }

    this.get_experiments_by_sampleid_geneid_async = function(ids, gl, _callback, _error_callback)
    {
        json_call_ajax_async("PlantExpression.get_experiments_by_sampleid_geneid", [ids, gl], 1, _callback, _error_callback)
    }

    this.get_eo_sampleidlist = function(lst)
    {
        var resp = json_call_ajax_sync("PlantExpression.get_eo_sampleidlist", [lst]);

        return resp[0];
    }

    this.get_eo_sampleidlist_async = function(lst, _callback, _error_callback)
    {
        json_call_ajax_async("PlantExpression.get_eo_sampleidlist", [lst], 1, _callback, _error_callback)
    }

    this.get_po_sampleidlist = function(lst)
    {
        var resp = json_call_ajax_sync("PlantExpression.get_po_sampleidlist", [lst]);

        return resp[0];
    }

    this.get_po_sampleidlist_async = function(lst, _callback, _error_callback)
    {
        json_call_ajax_async("PlantExpression.get_po_sampleidlist", [lst], 1, _callback, _error_callback)
    }

    this.get_all_po = function()
    {
        var resp = json_call_ajax_sync("PlantExpression.get_all_po", []);

        return resp[0];
    }

    this.get_all_po_async = function(_callback, _error_callback)
    {
        json_call_ajax_async("PlantExpression.get_all_po", [], 1, _callback, _error_callback)
    }

    this.get_all_eo = function()
    {
        var resp = json_call_ajax_sync("PlantExpression.get_all_eo", []);

        return resp[0];
    }

    this.get_all_eo_async = function(_callback, _error_callback)
    {
        json_call_ajax_async("PlantExpression.get_all_eo", [], 1, _callback, _error_callback)
    }

    this.get_po_descriptions = function(ids)
    {
        var resp = json_call_ajax_sync("PlantExpression.get_po_descriptions", [ids]);

        return resp[0];
    }

    this.get_po_descriptions_async = function(ids, _callback, _error_callback)
    {
        json_call_ajax_async("PlantExpression.get_po_descriptions", [ids], 1, _callback, _error_callback)
    }

    this.get_eo_descriptions = function(ids)
    {
        var resp = json_call_ajax_sync("PlantExpression.get_eo_descriptions", [ids]);

        return resp[0];
    }

    this.get_eo_descriptions_async = function(ids, _callback, _error_callback)
    {
        json_call_ajax_async("PlantExpression.get_eo_descriptions", [ids], 1, _callback, _error_callback)
    }

    /*
     * JSON call using jQuery method.
     */

    function json_call_ajax_sync(method, params)
    {
        var rpc = { 'params' : params,
                    'method' : method,
                    'version': "1.1",
                    'id': String(Math.random()).slice(2),
        };
        
        var body = JSON.stringify(rpc);
        var resp_txt;
        var code;

	var token = _auth.token;
	if (_auth_cb)
	{
	    token = _auth_cb();
	}

        var x = jQuery.ajax({
		"async": false,
		dataType: "text",
		url: _url,
		beforeSend: function (xhr){
		    if (token)
		    {
			xhr.setRequestHeader('Authorization', _auth.token);
		    }
		},
		success: function (data, status, xhr) { resp_txt = data; code = xhr.status },
		error: function(xhr, textStatus, errorThrown) { resp_txt = xhr.responseText, code = xhr.status },
		data: body,
		processData: false,
		type: 'POST',
	    });

        var result;

        if (resp_txt)
        {
            var resp = JSON.parse(resp_txt);
            
            if (code >= 500)
            {
                throw resp.error;
            }
            else
            {
                return resp.result;
            }
        }
        else
        {
            return null;
        }
    }

    function json_call_ajax_async(method, params, num_rets, callback, error_callback)
    {
        var rpc = { 'params' : params,
                    'method' : method,
                    'version': "1.1",
                    'id': String(Math.random()).slice(2),
        };
        
        var body = JSON.stringify(rpc);
        var resp_txt;
        var code;
        
	var token = _auth.token;
	if (_auth_cb)
	{
	    token = _auth_cb();
	}

        var x = jQuery.ajax({
		"async": true,
		dataType: "text",
		url: _url,
		beforeSend: function (xhr){
		    if (token)
		    {
			xhr.setRequestHeader('Authorization', token);
		    }
		},
		success: function (data, status, xhr)
		{
		    resp = JSON.parse(data);
		    var result = resp["result"];
		    if (num_rets == 1)
		    {
			callback(result[0]);
		    }
		    else
		    {
			callback(result);
		    }
                    
		},
		error: function(xhr, textStatus, errorThrown)
		{
		    if (xhr.responseText)
		    {
			resp = JSON.parse(xhr.responseText);
			if (error_callback)
			{
			    error_callback(resp.error);
			}
			else
			{
			    throw resp.error;
			}
		    }
		},
		data: body,
		processData: false,
		type: 'POST',
	    });
    }
}


