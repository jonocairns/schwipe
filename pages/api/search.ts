import { NextApiResponse } from 'next'
import { NextApiRequestWithSession, plexLoginInstance } from './login';
import withSession from '../../utils/withSession';
import {parseStringPromise} from 'xml2js';
import PlexApi from 'plex-api';

const handler = async  (_req: NextApiRequestWithSession, res: NextApiResponse) => {
  const credentials = _req.session.get('plexCredentials'); 
  const plexUserInfo = ( await plexLoginInstance.getUserInfo(credentials)) as any;
console.log(plexUserInfo?.authToken)
   const resp = await fetch('https://plex.tv/pms/servers.xml', {headers: {
       'X-Plex-Token': plexUserInfo?.authToken
   }});
   const data = await resp.text();
   const json = await parseStringPromise(data);

   console.log(JSON.stringify(json))
   const address = json.MediaContainer.Server[0].$.host;

   const client = new PlexApi({
    hostname: address,
    token: plexUserInfo?.authToken
   });

   const lol = await client.query("/library/sections");

   const section = lol.MediaContainer.Directory.find((d: {type: string, agent: string}) => d.type === 'movie' || d.type === 'show' && d.agent !== 'com.plexapp.agents.none')

   const media = await client.query(`/library/sections/${section.key}/all`);

  res.json(media);

}

export default withSession(handler);
