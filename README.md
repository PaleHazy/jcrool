# Jcrool, the Object and Array crawler. 
Library for crawling javascript objects and arrays recursively; to locate certain properties (key/value pairs). Good for deeply nested structures. 

# An Example

The response from https://reddit.com/.json is big. you just need every single instance of the word GME in all of the comments possibly visible to us in the data. 

```
const result = jcrool(redditJsonData, [
  {keys: ['comment'], types: ['string'] },
]

// where result would be [ { comment: 'value of comment key'}, { comment: 'other value $GME'}, ... ]
```

