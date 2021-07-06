/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       11 Dec 2018     jpgumapac
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @returns {Boolean} True to continue save, false to abort save
 */
function clientSaveRecord(){
    var estTotal = nlapiGetFieldValue('total');
    var opportunity = nlapiGetFieldValue('opportunity');
    var oopOBJ = nlapiLoadRecord('opportunity', opportunity);
    var opportunityTotal = oopOBJ.getFieldValue('projectedtotal');
    if (estTotal != opportunityTotal)
    {
        var response = confirm("Please Note: This estimate total does not match the projected total on the opportunity. Would you like to update the projected total on the opportunity to match this estimate?");
        if (response==true)
        {
            nlapiSetRedirectURL('RECORD', 'opportunity', opportunity, true);
            return true;
        }
        else
        {
            return true;
        }    
    }
    else{
    	alert('Opportunity and estimate record Match');
    }
    return true;
}
