<script type="text/javascript">
function searchClick() {
  if (!IN.ENV.auth.oauth_token) {
    alert("You must login w/ LinkedIn to use the Search functionality!");
    return;
  }

  IN.API.PeopleSearch()
    .fields("id", "firstName", "lastName", "headline", "industry")
    .params({
      "first-name": document.searchform.firstName.value,
      "last-name": document.searchform.lastName.value,
      "company": document.searchform.company.value,
      "keywords": document.searchform.keywords.value
    })
    .result(function(result, metadata) {
      setSearchResults(result, metadata);
    });
}

function setSearchResults(result, metadata) {
  searchHTML = "Search Results (" + result.numResults + "):<ul>";
  console.log(result.people.values);
  for (i in result.people.values) {
    searchHTML = searchHTML + "<li>";
    searchHTML = searchHTML + result.people.values[i].firstName + " ";
    searchHTML = searchHTML + result.people.values[i].lastName + ", ";
    searchHTML = searchHTML + result.people.values[i].headline + "</li>";
  }
  searchHTML = searchHTML + "</ul>";
  
  document.getElementById("searchresults").innerHTML = searchHTML;
}
</script>

<!-- need to be logged in to use Search; if not, offer a login button -->
<script type="IN/Login"></script>
<p>Basic test of the People Search API via Connect. <br />
You must click the button (pressing Enter doesn't work).</p>
<form name="searchform" onsubmit="return false;">
  First Name:&nbsp;<input type="text" name="firstName"><br/>
  Last Name:&nbsp;<input type="text" name="lastName"><br/>
  Company:&nbsp;<input type="text" name="company"><br/>
  Keywords:&nbsp;<input type="text" name="keywords"><br/>
  <input type="button" name="search1" value="Search LinkedIn!" onclick="searchClick()">
</form>
<div id="searchresults"></div>
