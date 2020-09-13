import { NextApiRequest, NextApiResponse } from 'next'
import * as plexLogin  from 'login-with-plex'
import withSession from '../../utils/withSession';

export const plexLoginInstance = new plexLogin.PlexLogin({
    appName: 'Schwipe',
    clientId: 'a3a22287-7ac7-4c04-a1f6-3ed6565fcf37',
    forwardUrl: 'http://localhost:3000/api/redirect'
  });

  export type NextApiRequestWithSession = NextApiRequest & {
    session: any;
  }

const handler = async  (_req: NextApiRequestWithSession, res: NextApiResponse) => {
  // Generate credentials for user
  console.log(_req.session)
  const credentials = await plexLoginInstance.generateCredentials();
  _req.session.set('plexCredentials', credentials);

  await _req.session.save();

  console.log(credentials);
 
  // Redirect user to plex login page
  res.redirect(plexLoginInstance.getLoginUrl(credentials));
}

export default withSession(handler);
