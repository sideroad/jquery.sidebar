export PATH=/usr/local/bin:/path/to/node:/path/to/node_bin:/path/to/phantomjs:/path/to/jscoverage:$PATH;

npm install
grunt jenkins --no-color
