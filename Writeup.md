# Network Traffic Analysis
### Objective
The goal of this technical case was to analyze network traffic data to identify security risks, propose a mitigation strategy, and implement a practical solution to these problems. 

### Key Findings
By combing through the logs, we can see that the attackers used a mix of:
- Legitimate-looking user-agent strings to bypass basic detection, such as mimicking popular browsers (e.g., Chrome, Firefox).
- Obfuscated or outdated browser versions indicating potential automation tools or misconfigured environments.
- Payloads containing payloads tailored for XSS and SQL Injection attacks, aiming to exploit input fields or weak sanitization.
- Attempts to execute commands on the server via a web shell, possibly due to an already compromised application.
- Attempts to locate backup files of PHP configuration files that might have been left exposed. Such files often contain sensitive information like database credentials or API keys.
- Attempts to log in using common default credentials, likely targeting weakly secured admin panels.
- Attemps to access `/wp-admin/setup-config.php`, a known WordPress setup file, possibly to try and reconfigure or exploit an incomplete WordPress setup.
- Attempts to access `phpinfo.php`, possibly to disclose sensitive server details like PHP version, server configuration, and loaded extensions.
- Attempts to traverse directories to access the `win.ini` file. While this file is not critical on modern systems, it can confirm that the target system is running Windows and could reveal some configuration information.
- Attempts to access the `cmd.exe` command line interpreter. It could allow the attacker to execute arbitrary commands, leading to a full compromise of the system.
- Attempts to perform Null Byte Injection attacks. This attack can trick the application into thinking a string ends earlier than intended, which could bypass security mechanisms or alter application logic.
- Platform-specific (both Linux and Windows paths are targeted) attempts of path traversal attacks, suggesting the attacker is looking for weaknesses across multiple environments.
- Attempts at accessing `.git/config`. This could reveal sensitive repository information, including remote repository URLs and potentially secrets embedded in the repo.

### Analyzing the Data 
#### Request Path
I started by analyzing the `ClientRequestPath` field. It captures the endpoints targeted by incoming requests, making it an excellent source of information to understand the attack surface and identify malicious patterns. While running through the data from this particular field, I was mainly looking for signs of malicious behavior, such as:
- Requests to unusual endpoints (/admin, /debug, /hidden);
- Payloads with special characters used in injection attacks (<, >, ', ", %, --);
- Query strings indicative of automated attacks.

After finding request paths that were clearly malicious, I filtered and grouped the data using simple criteria, such as counting requests per unique URI or isolating requests with query parameters.

### Mitigation Policies


### Conclusion
