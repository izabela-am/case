import axios from 'axios';

interface IData {
  last_update_utc: string;
  headers: Array<{
    name: string;
    value: string
  }>;
}
// This API is open and public, so there is no harm on leaving the endpoint hard-coded
const OWASP_API = 'https://owasp.org/www-project-secure-headers/ci/headers_add.json';

export async function secureHeaders(): Promise<IData> {
  const response = await axios.get(OWASP_API);
  const data: IData = response.data;

  return data;
}
