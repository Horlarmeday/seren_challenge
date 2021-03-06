import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import events from '../module/Slack/events';
import interactions from '../module/Slack/interactions';

export default (server, express) => {
  server.use(cors({ credentials: true, origin: [], optionsSuccessStatus: 200 }));
  server.use(helmet());
  // slack events
  events.listenForEvents(server);
  interactions.listenForInteractions(server);

  server.use(morgan('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(express.static('download'));
  server.use('/static', express.static(path.join(__dirname, '../public')));
};
