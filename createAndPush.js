const fs = require('fs');
const path = require('path');
const https = require('https');

const OWNER = 'aadichavan8876';
const REPO_NAME = process.argv[3] || 'ai-developer-portfolio';
const TOKEN = process.argv[2] || process.env.GITHUB_TOKEN;

if (!TOKEN) {
  console.log('====================================================');
  console.log('GitHub Token Required to Automatically Create & Push!');
  console.log('====================================================');
  console.log('Usage: node createAndPush.js <YOUR_GITHUB_TOKEN> [NEW_REPO_NAME]');
  console.log('Example: node createAndPush.js ghp_xxxxxxxxxxxx ai-developer-portfolio');
  console.log('\nGet your token in 30 seconds:');
  console.log('1. Go to https://github.com/settings/tokens');
  console.log('2. Click "Generate new token (classic)" -> Check "repo" scope.');
  console.log('3. Copy token and run the command above!');
  console.log('====================================================');
  process.exit(1);
}

function request(options, bodyData) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: data }));
    });
    req.on('error', err => reject(err));
    if (bodyData) req.write(bodyData);
    req.end();
  });
}

async function createRepository() {
  console.log(`[1/3] Creating repository "${OWNER}/${REPO_NAME}" on GitHub...`);
  const body = JSON.stringify({
    name: REPO_NAME,
    description: "Modern AI-Powered and Cloud-Integrated Developer Portfolio for Aditya Rajesh Chavan",
    private: false
  });

  const res = await request({
    hostname: 'api.github.com',
    path: '/user/repos',
    method: 'POST',
    headers: {
      'User-Agent': 'NodeJS-Uploader',
      'Authorization': `token ${TOKEN}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body)
    }
  }, body);

  if (res.status === 201) {
    console.log(`[SUCCESS] Created new GitHub Repository: https://github.com/${OWNER}/${REPO_NAME}`);
  } else if (res.status === 422) {
    console.log(`[NOTICE] Repository "${REPO_NAME}" already exists on GitHub. Uploading files...`);
  } else {
    console.log(`[API Error ${res.status}] ${res.data}`);
  }
}

const ignoreList = ['node_modules', '.git', '.env', 'dist', 'push_to_github.ps1', 'push.bat', 'pushToGithubApi.js', 'createAndPush.js'];

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    if (ignoreList.includes(file)) return;
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

async function getSha(filePath) {
  const relPath = path.relative(__dirname, filePath).replace(/\\/g, '/');
  const res = await request({
    hostname: 'api.github.com',
    path: `/repos/${OWNER}/${REPO_NAME}/contents/${relPath}`,
    method: 'GET',
    headers: {
      'User-Agent': 'NodeJS-Uploader',
      'Authorization': `token ${TOKEN}`
    }
  });

  try {
    const parsed = JSON.parse(res.data);
    return parsed.sha || null;
  } catch (e) {
    return null;
  }
}

async function uploadFile(filePath) {
  const relPath = path.relative(__dirname, filePath).replace(/\\/g, '/');
  const sha = await getSha(filePath);
  const content = fs.readFileSync(filePath).toString('base64');

  const body = JSON.stringify({
    message: `Add ${relPath}`,
    content: content,
    sha: sha || undefined
  });

  const res = await request({
    hostname: 'api.github.com',
    path: `/repos/${OWNER}/${REPO_NAME}/contents/${relPath}`,
    method: 'PUT',
    headers: {
      'User-Agent': 'NodeJS-Uploader',
      'Authorization': `token ${TOKEN}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body)
    }
  }, body);

  if (res.status >= 200 && res.status < 300) {
    console.log(`[SUCCESS] Uploaded: ${relPath}`);
  } else {
    console.log(`[FAILED ${res.status}] ${relPath}`);
  }
}

async function main() {
  await createRepository();
  const files = getFiles(__dirname);
  console.log(`[2/3] Uploading ${files.length} project files...`);
  for (const file of files) {
    await uploadFile(file);
  }
  console.log('====================================================');
  console.log(`[3/3] Done! Your repository is live at:`);
  console.log(`👉 https://github.com/${OWNER}/${REPO_NAME}`);
  console.log('====================================================');
}

main();
