import { Service } from 'typedi';

@Service()
export class CommonService {
    /**
     *
     * @param userEmail
     * @param index
     */
    getUsername(userEmail: string, index: number): string {
        // creating a fake email for child
        const userEmailSplit = userEmail.split('@');
        return `${userEmailSplit[0]} ${index + 1}@${userEmailSplit[1]}`;
      }
}