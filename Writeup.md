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
I started by analyzing the `ClientRequestPath` field. It captures the endpoints targeted by incoming requests, making it an excellent source of information to understand the attack surface and identify malicious patterns. While running through the data from this particular field, I was mainly looking for signs of malicious behavior, such as:
- Requests to unusual endpoints (/admin, /debug, /hidden);
- Payloads with special characters used in injection attacks (<, >, ', ", %, --);
- Query strings indicative of automated attacks.

After finding request paths that were clearly malicious, I filtered and grouped the data using simple criteria, such as counting requests per unique URI or isolating requests with query parameters. Repetition patterns helped identify endpoints that attackers repeatedly targeted (excluding ones that seemed like legitimate requests), potentially indicating attempts to exploit specific vulnerabilities.

Here are some examples of what I observed:
- There were numerous requests attempting to exploit various vulnerabilities, such as:
  - Cross-Site Scripting (XSS);
  - Server-Side Template Injection (SSTI)
  - Null Byte Injection
  - SQL Injection
  - HTML Injection
  - Path Traversal
  - Credential Brute Forcing
  - Remote Command Execution (RCE)
  - Config File Disclosure
  - Information Disclosure
- There were over 600 different IP addresses sending maliciously formatted query strings to try and exploit a XSS vulnerability in the server;
- 57% of the attempted XSS requests were made from Indonesia, and 41% from the US;
- 55% of the attempted SSTI requests were made from Indonesia, and 37.5% from the US;
- 138 requests were made without the use of TLS over HTTP (i.e. HTTPS);
- The IP address `53.153.77.110` sent a total of 156 requests, the most for any IP in the log file. 11 of these requests contained a malicious payload of some sort.
- 

Some insights:
- Although a high number of malicious requests have been sent from Indonesia, there needs to be a thorough risk analysis process to validate if it's really worth it bussiness-wise to block requests coming from that country. Requests coming from Indonesia represent over 61% of the traffic processed by the server;
- 

### Mitigation Policies


### Conclusion
