import { OpenAIChat } from 'langchain/llms';
import { Configuration, OpenAIApi } from "openai";
import { LLMChain, ChatVectorDBQAChain, loadQAChain } from 'langchain/chains';
import { PineconeStore } from 'langchain/vectorstores';
import { PromptTemplate } from 'langchain/prompts';
import { CallbackManager } from 'langchain/callbacks';




const CONDENSE_PROMPT =
  PromptTemplate.fromTemplate(`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question. 

Follow Up Input: {question}
Standalone question:`);


// `You are an Recruiter finding suitable candidate. You are given the following extracted data of a long document and a question. Provide the conversational answer with names of candidates based on the context provided.

//   If you can't find suitable candidates in the context below, just say "Sorry, no match found.." Don't try to make up an answer.
//   If the question is not related to the context provided, politely inform them that you are tuned to only answer questions that are related to DFCC bank.

// Question: {question}
// =========
// {context}
// =========
// Answer in Markdown:`

//  Do not make up any other answer. Do not add additional punctuation marks.



// //  `You are an Recruiter finding suitable candidate. You are given the following extracted data of a long document and a question. Provide only cv of candidates as a array only separated by comma based on the context provided.

//   Follow this example array: "[Sachini's resume-3, Amanda-CV, cv-test-doc]"  

//   If you can't find suitable candidates in the context below, just say "Sorry, no match found.." Don't try to make up an answer.
//   If the question is not related to the context provided, politely inform them that you are tuned to only answer questions that are related to DFCC bank.

// Question: {question}
// =========
// {context}
// =========
// Answer in Markdown:`

// conversational answer with
const QA_PROMPT = PromptTemplate.fromTemplate(
  `You are an Recruiter finding suitable candidates. You are given the following extracted data of a long document and a question. Provide all the names that suitable for requirements of the question based on the context provided. you must provide all the names you can find for the answer. 
  Follow this example to answer: John Doe , Amanda Sasangi

  If you can't find suitable candidates in the context below, just say "Sorry, no match found.." Don't try to make up an answer.
  If the question is not related to the context provided, politely inform them that you are tuned to only answer questions that are related to DFCC bank.

Question: {question}
=========
{context}
=========
Answer in Markdown:`,
);



// export const makeChain = (
//   vectorstore: PineconeStore,
//   onTokenStream?: (token: string) => void,
// ) => {
//   const questionGenerator = new LLMChain({
//     llm: new OpenAIChat({ temperature: 0 }),
//     prompt: CONDENSE_PROMPT,
//   });
//   const docChain = loadQAChain(
//     new OpenAIChat({
//       temperature: 0,
//       modelName: 'gpt-3.5-turbo',
//       streaming: Boolean(onTokenStream),
//       callbackManager: onTokenStream
//         ? CallbackManager.fromHandlers({
//             async handleLLMNewToken(token) {
//               onTokenStream(token);
//               console.log(token);
//             },
//           })
//         : undefined,
//     }),
//     { prompt: QA_PROMPT },
//   );

//   const chatVectorDBQAChain = new ChatVectorDBQAChain({
//     vectorstore,
//     combineDocumentsChain: docChain,
//     questionGeneratorChain: questionGenerator,
//     returnSourceDocuments: true, //number of source documents to return
//   });

//   return chatVectorDBQAChain
// };




// const CONDENSE_PROMPT =
//   PromptTemplate.fromTemplate(`answer to this question based on context : {question}`);


export const makeChain = (
  vectorstore: PineconeStore,
  onTokenStream?: (token: string) => void,
) => {
  const questionGenerator = new LLMChain({
    llm: new OpenAIChat({ temperature: 0 }),
    prompt: CONDENSE_PROMPT,
  });
  const docChain = loadQAChain(
    new OpenAIChat({
      temperature: 0.6,
      modelName: 'gpt-3.5-turbo',
      streaming: Boolean(onTokenStream),
      callbackManager: onTokenStream
        ? CallbackManager.fromHandlers({
            async handleLLMNewToken(token) {
              onTokenStream(token);
              console.log(token);
            },
          })
        : undefined,
    }),
    { prompt: QA_PROMPT },
  );

  const chatVectorDBQAChain = new ChatVectorDBQAChain({
    vectorstore,
    combineDocumentsChain: docChain,
    questionGeneratorChain: questionGenerator,
    returnSourceDocuments: true, 
    k: 10//number of source documents to return
  });

  return chatVectorDBQAChain
};
