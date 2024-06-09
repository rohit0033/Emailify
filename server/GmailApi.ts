import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import dotenv from 'dotenv';
dotenv.config();

class GmailAPI {
  private accessToken: string = "";

  constructor() {
    this.getAccessToken().then((token) => {
      this.accessToken = token;
    });
  }
  

  private async getAccessToken(): Promise<string> {
    const data = qs.stringify({
        client_id:
        process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      refresh_token:
      process.env.REFRESH_TOKEN,
      grant_type: "refresh_token",
    });
    

    const config: AxiosRequestConfig = {
      method: "post",
      url: "https://accounts.google.com/o/oauth2/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    try {
      const response = await axios(config);
      return response.data.access_token;
    } catch (error) {
      console.error(error);
      return "";
    }
  }

  public async searchAllGmail(searchItem: string, maxResults: number): Promise<string[]> {
    const config: AxiosRequestConfig = {
      method: "get",
      url: `https://www.googleapis.com/gmail/v1/users/me/messages?q=${searchItem}&maxResults=${maxResults}`,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    };

    try {
      const response = await axios(config);
      return response.data.messages.map((message: { id: string }) => message.id);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async readGmailContent(messageId: string): Promise<any> {
    const config: AxiosRequestConfig = {
      method: "get",
      url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async readAllInboxContent(searchText: string, maxEmails: number): Promise<string> {
    const threadIds = await this.searchAllGmail(searchText, maxEmails);
    let allDecodedStr = '';

    for (const threadId of threadIds) {
      const message = await this.readGmailContent(threadId);

      if (!message || !message.payload || !message.payload.parts) {
        console.error('Invalid message data:', message);
        continue;
      }

      let decodedStr = '';
      for (const part of message.payload.parts) {
        if (part.body && part.body.data) {
          const encodedMessage = part.body.data;
          decodedStr += Buffer.from(encodedMessage, "base64").toString("ascii");
        }
      }

      allDecodedStr += decodedStr + '\n\n';
    }

    return allDecodedStr;
  }
}

export default new GmailAPI();
