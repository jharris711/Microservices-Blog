# Microservices-Blog
### Mini-blog miniservices demo built with Kubernetes, Docker, Skaffold, React, and Node.js

### To use:
- #### You will need [Docker](https://www.docker.com/), [Kubernetes](https://kubernetes.io/), and [Skaffold](https://skaffold.dev/) installed on your machine to run this application.
- #### Open your /etc/hosts file in your code editor and paste the following at the bottom to point posts.com to localhost:  
```
127.0.0.1 posts.com
```
- #### Clone the repo and change into the Microservices-Blog directory:
```bash
$ git clone https://github.com/jharris711/Microservices-Blog.git && cd Microservices-blog
```
-  #### From the Microservices-blog dir, run the Skaffold dev startup command:
```bash
$ skaffold dev
```

### This app will be in your browser at http://posts.com.
