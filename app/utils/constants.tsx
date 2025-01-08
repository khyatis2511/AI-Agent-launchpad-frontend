import SummarizationIcon from '@mui/icons-material/Summarize';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CreateIcon from '@mui/icons-material/Create';


export const dateFormat = 'DD-MM-YYYY';

export const SUCCESS_MESSAGE = {
  event: {
    create: 'Event Created Successfully',
    update: 'Event Updated Successfully'
  }
}

export const agents = [
  { name: 'Summarization', description: 'Summarize large text into concise points', icon: SummarizationIcon },
  { name: 'Question Answering', description: 'Answer questions based on provided context', icon: QuestionAnswerIcon },
  { name: 'Creative Text Generation', description: 'Generate creative text or stories', icon: CreateIcon },
];

export const secureRoutes = ['/dashboard', '/agent'];

export const checkSecureRoutes = (pathName: string) => {
  for(const routes of secureRoutes) {
    console.log('routes', routes);
    if(pathName.includes(routes)) return true;
  }
  return false;
}