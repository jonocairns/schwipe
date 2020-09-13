import { NextApiResponse } from 'next'
import { NextApiRequestWithSession, plexLoginInstance } from './login';
import withSession from '../../utils/withSession';

const handler = async  (_req: NextApiRequestWithSession, res: NextApiResponse) => {
 
  console.log(_req.session)
  // Load user credentials from session
  const credentials = _req.session.get('plexCredentials'); 



  console.log(JSON.stringify(credentials))
  // Get user's plex information after they have logged in
  const plexUserInfo = await plexLoginInstance.getUserInfo(credentials);
 
  // You probably want to validate the plex user against your server
  console.log(JSON.stringify(credentials))
  // Save plex user's information somewhere, or in session
  console.log(JSON.stringify(plexUserInfo))
  
  // Redirect user back to your app
  res.redirect('/');
}

export default withSession(handler);
