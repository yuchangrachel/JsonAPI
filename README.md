## Build backend JSON API using Node&Express

Implement routes as below:
1./api/ping
Response body (JSON):
{
"success": true
}
Response status code: 200
2./api/posts?tags=topic1,topic2&sortedBy=oneOf&direction=desc
tag's parameters: comma seperated by list of tags(must have at least one tag)
sortedBy's parameters: id(default), reads, likes, popularity
direction's parameters: asc(default), desc

Error Message:
If `tags` parameter is not present:
Response body (JSON):
{
"error": "Tags parameter is required"
}
Response status code: 400
If a `sortBy` or `direction` are invalid values, specify an error like below:
Response body (JSON):
{
"error": "sortBy parameter is invalid"
}
Response status code: 400
