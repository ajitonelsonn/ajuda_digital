# Ajuda Digital - Document Processing System

A notebook for processing government document images to create text content for the Ajuda Digital chatbot system. This tool extracts text from images using Amazon Textract, translates Tetum content to English using SEA-LION, and organizes files for RAG embedding.

## Overview

This system processes government documents collected from various sources (office boards, social media, websites) and converts them into structured text files ready for embedding in the Ajuda Digital knowledge base.

## Features

- **Image Upload**: Support for JPG, JPEG, PNG, and other image formats
- **OCR Processing**: Amazon Textract for accurate text extraction
- **Language Detection**: Manual selection for Tetum language content
- **Translation**: SEA-LION model for Tetum to English translation
- **Department Classification**: Categorization into 10 government service areas
- **Source Tracking**: Metadata tracking for document provenance
- **Cloud Storage**: AWS S3 integration with organized file structure
- **Progress Tracking**: Visual progress indicators and

## Prerequisites

### Required Accounts

- **AWS Account** with credits
- **SEA-LION API** access key

## Installation

1. **Open Google Colab** and create a new notebook
2. **Run Cell 1** to install required packages:
   ```python
   !pip install boto3 openai ipywidgets pillow
   ```

## Configuration

### Step 1: Update Configuration (Cell 3)

Replace the placeholder values in the Config class:

```python
class Config:
    AWS_REGION = 'us-east-1'
    S3_BUCKET = 'your-bucket-name'
    SEA_LION_API_KEY = 'your-sea-lion-api-key'
    # ... other settings
```

### Step 2: AWS Credentials (Cell 4)

Add your AWS credentials to the `init_aws_services()` function:

```python
aws_access_key_id = 'YOUR_AWS_ACCESS_KEY_ID'
aws_secret_access_key = 'YOUR_AWS_SECRET_ACCESS_KEY'
```

**Security Note**: For production use, prefer environment variables or IAM roles over hardcoded credentials.

## Usage

### Basic Workflow

1. **Run Cells 1-13** sequentially to set up the system
2. **Upload an image** using the file upload widget
3. **Select language**: Check "Is this in Tetum language?" if applicable
4. **Choose department** from the dropdown (1-10)
5. **Select source** (Facebook, Government Website, Office Board, etc.)
6. **Set date** when the image was captured
7. **Click "Process Document"** to start processing

### Button Functions

- **Process Document**: Execute the full processing pipeline
- **New Process**: Complete fresh start with cleared output

### Processing Pipeline

1. **Upload**: Original image uploaded to S3
2. **OCR**: Amazon Textract extracts text from image
3. **Save Original**: Text file with metadata created
4. **Translation**: If Tetum selected, SEA-LION translates to English
5. **Save Translation**: English text file created (if applicable)

## Output Structure

### File Organization

```
s3://your-bucket/doc/YYYY/MM/DD/department_id/
├── doc_uniqueid_deptcode.jpg          # Original image
├── doc_uniqueid_deptcode_original.txt # OCR text with metadata
└── doc_uniqueid_deptcode_english.txt  # English translation (if Tetum)
```

### Department Codes

1. Civil Registry & Identity Model (Registo Civil)
2. Immigration & Travel Model (Imigração e Viagens)
3. Education Model (Educação)
4. Business & Commerce Model (Negócios e Comércio)
5. Legal & Constitutional Model (Jurídico e Constitucional)
6. Elections & Civic Participation (Eleições e Participação Cívica)
7. Health & Social Services (Saúde e Serviços Sociais)
8. Finance & Taxation (Finanças e Tributação)
9. Land & Property (Terras e Propriedade)
10. Employment & Labor (Emprego e Trabalho)

### Text File Format

Each processed text file includes:

```
Source: [Facebook/Website/Office Board/etc.]
Department: [Department Name]
Date Taken: [YYYY-MM-DD]
Original Image: [S3 URL]
Processed: [Timestamp]

---EXTRACTED TEXT--- / ---TRANSLATED TEXT---
[Content here]
```

## Integration with Ajuda Digital

### For RAG Embedding

1. **Download English text files** from S3 after processing
2. **Upload to chat.ajuda-digital.com** admin panel
3. **Assign to appropriate department model** for embedding
4. **Processed files become searchable** in the chatbot

## System Architecture

## ![System Architecture](diagram.jpg)

### Workflow

**1. Upload Image** - User uploads government document image
**2. OCR Processing** - Amazon Textract extracts text
**3. Translation** - SEA-LION translates Tetum to English (if needed)
**4. Storage** - Files saved to S3 with metadata
**5. Integration** - Download and upload to Ajuda Digital for RAG embedding

---

![Tais](https://i.postimg.cc/Sx3sDr0L/tais.png)
