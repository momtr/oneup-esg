# OneUp ESG

## 1. Steps

### 1.1. Preparing and Saving data (Pre-Processing)
1. Uploade ESG Report of Company
2. Split report into 15-page batches
3. Perform OCR scan in Google Cloud to retrive text
4. Join text of batches for one report together
5. Extract `company_name` and `reporting_year` together + 6 `metrics` (= `comparable_vector`) (for kNN later) from `document_text`
6. Save data object in MongoDB database

### 1.2. API for Data Extraction
Develop AI which offers a route to get a JSON response for:
   - a specific company
   - a specifiy year
   - a specific prompt (query)

The input for the text-query should be the `company_data_model` (see below), `esg_knowledge_document` (containing synonyms for certain terms and definitions of EVIC), and the actual `prompt`.

There should be a standard prompt for the default view.

The response should have following structure:

```json
{
    "metrics": [
        {
            "name": "scope 1",
            "value": 202323,
            "reference_data_source": "The company's annual CO2 spending are ....",
            "reference_document": "https://....."
        },
        {
            "name": "scope 2",
            "value": 23,
            "reference_data_source": "The company's annual CO2 spending are ....",
            "reference_document": "https://....."
        },
    ]
}
```


### 1.4. General API
The general API provides a route for retrieving saved companys from the database.

### 1.3. User Interface
The UI presents a bubble view, which shows:
   - a filter that matches the `comparable_vector` (= revenue, industry, country location)
   - bubble size = revenue
   - bubble color = ESG score
   - 2d map = PCA output

When a bubble is clicked, similar bubbles show up (performed with kNN)

There should also be a prompt bar, which allows users to use the API for Data Exraction to get data back. This data is visually presented.

## 2. Data Model
```json
{
    "company_name": "OneUp",
    "reporting_year": 2023,
    "document_text": "This is the annual report for OneUp 2023\n\nPrelog...",
    "comparable_vector": {
        "revenue": 232323,
        ....
    }
}
```

## 3. Principles
- Choose clean partners to be cleaner
- Standard-compliant reporting 
- References shown in outputs
