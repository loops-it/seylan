import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import { PineconeStore } from 'langchain/vectorstores';
import { pinecone } from '@/utils/pinecone-client';
import { CustomPDFLoader } from '@/utils/customPDFLoader';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '@/config/pinecone';
import { DirectoryLoader, PDFLoader, CSVLoader } from 'langchain/document_loaders';

/* Name of directory to retrieve your files from */
const filePath = 'docs';

export const run = async () => {


  try {
    /*load raw docs from the all files in the directory */
    // const directoryLoader = new DirectoryLoader(filePath, {
    //   '.csv': (path) => new CustomPDFLoader(path),
    // });

    // const loader = new CSVLoader(filePath);
    const loader = new CSVLoader(filePath + "/cvdetails.csv");
    const rawDocs = await loader.load();

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    console.log('split docs', docs);

    console.log('creating vector store...');
    
    /*create and store the embeddings in the vectorStore*/
    const embeddings = new OpenAIEmbeddings();
    const index = (await pinecone).Index(PINECONE_INDEX_NAME);

    //embed the csv documents
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: PINECONE_NAME_SPACE,
      textKey: 'text',
    });

    // console.log(index);



  // try {
  //   /*load raw docs from the all files in the directory */
  //   const directoryLoader = new DirectoryLoader(filePath, {
  //     '.pdf': (path) => new CustomPDFLoader(path),
  //   });

  //   const loader = new PDFLoader(filePath);
  //   const rawDocs = await directoryLoader.load();

  //   /* Split text into chunks */
  //   const textSplitter = new RecursiveCharacterTextSplitter({
  //     chunkSize: 1000,
  //     chunkOverlap: 200,
  //   });

  //   const docs = await textSplitter.splitDocuments(rawDocs);
  //   console.log('split docs', docs);

  //   console.log('creating vector store...');
    
  //   /*create and store the embeddings in the vectorStore*/
  //   const embeddings = new OpenAIEmbeddings();
  //   const index = (await pinecone).Index(PINECONE_INDEX_NAME);

  //   //embed the PDF documents
  //   await PineconeStore.fromDocuments(docs, embeddings, {
  //     pineconeIndex: index,
  //     namespace: PINECONE_NAME_SPACE,
  //     textKey: 'text',
  //   });

  //   // console.log(index);
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await run();
  console.log('ingestion complete');
})();


