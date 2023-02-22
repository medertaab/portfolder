import React from 'react'
import { db } from "../firebase";
import { doc, getDoc, getDocs, collection, query, where, limit } from 'firebase/firestore'

export default function useFilterUsername() {

  function checkUsernameReserved(username) {
    const reservedWords = [
      'amazon', 'apache', 'apple', 'atlassian', 'facebook', 'github', 'google',
      'htc', 'microsoft', 'mozilla', 'nokia', 'rim', 'samsung', 'sony', 'toshiba',
      'twitter', 'wikipedia',
  
      'android', 'centos', 'debian', 'dos', 'fedora', 'ios', 'linux', 'mac',
      'msdos', 'opensuse', 'osx', 'symbian', 'ubuntu', 'unix', 'windows',
  
      'aol', 'aws', 'chrome', 'cvs', 'firefox', 'git', 'gmail', 'hg', 'hotmail',
      'httpd', 'mercurial', 'mongodb', 'mysql', 'nginx', 'oracle', 'outlook',
      'postgresql', 'pycharm', 'redis', 's3', 'sourcetree', 'svn', 'yahoo',
  
      'aac', 'apk', 'asp', 'aspx', 'atom', 'avi', 'bat', 'bin', 'bmp', 'cgi',
      'cgi-bin', 'com', 'cpp', 'css', 'csv', 'dat', 'db', 'doc', 'docm',
      'docx', 'exe', 'flac', 'flv', 'fon', 'font', 'gif', 'h', 'hdr', 'hpp',
      'htm', 'html', 'jpeg', 'jpg', 'js', 'json', 'kbd', 'kbm', 'mdb', 'mkv',
      'mov', 'mp3', 'mp4', 'mpeg', 'msi', 'obj', 'pdf', 'pdn', 'pem', 'php3',
      'php4', 'png', 'ppk', 'ppt', 'pptx', 'psd', 'pyc', 'raw', 'rb', 'rss',
      'rtf', 'sql', 'svg', 'swf', 'txt', 'xls', 'xlsx', 'xml', 'yaml', 'yml',
      'zip',
  
      'arpa', 'darpa', 'ftp', 'gopher', 'http', 'https', 'imap', 'irc', 'mail',
      'mail1', 'mail2', 'mail3', 'mail4', 'mail5', 'ns', 'ns1', 'ns2', 'ns3',
      'ns4', 'pop', 'pop3', 'rdp', 'sms', 'smtp', 'ssh', 'ssl', 'telnet', 'tls',
      'ww', 'wws', 'www', 'www1', 'www2', 'www3', 'www4', 'www5', 'www6', 'www7',
      'wwws', 'wwww',
  
      'and', 'either', 'from', 'if', 'limit', 'nand', 'nor', 'not', 'of',
      'or', 'order', 'unless', 'until', 'when', 'where',
  
      'above', 'after', 'back', 'before', 'begin', 'beginning', 'beginnings',
      'bottom', 'down', 'end', 'endpoint', 'endpoints', 'ends', 'first', 'front',
      'head', 'last', 'left', 'middle', 'origin', 'over', 'right', 'start',
      'starts', 'tail', 'top', 'under', 'up',
  
  
  
      'arabic', 'awadhi', 'azerbaijani', 'bengali', 'bhojpuri', 'burmese',
      'chinese', 'dutch', 'english', 'farsi', 'french', 'gan', 'german',
      'gujarati', 'hakka', 'hausa', 'hindi', 'italian', 'japanese', 'javanese',
      'jinyu', 'kannada', 'korean', 'maithili', 'malayalam', 'mandarin',
      'marathi', 'min-nan', 'oriya', 'panjabi', 'polish', 'portuguese',
      'romanian', 'russian', 'serbo-croatian', 'sindhi', 'spanish', 'sunda',
      'tamil', 'telugu', 'thai', 'turkish', 'ukrainian', 'urdu', 'vietnamese',
      'wu', 'xiang', 'yoruba',
  
      'ac', 'ad', 'ae', 'af', 'ag', 'ai', 'al', 'am', 'an', 'ao', 'aq', 'ar',
      'as', 'at', 'au', 'aw', 'ax', 'az', 'ba', 'bb', 'bd', 'be', 'bf', 'bg',
      'bh', 'bi', 'bj', 'bm', 'bn', 'bo', 'br', 'bs', 'bt', 'bv', 'bw', 'by',
      'bz', 'ca', 'cc', 'cd', 'cf', 'cg', 'ch', 'ci', 'ck', 'cl', 'cm', 'cn',
      'co', 'cr', 'cs', 'cu', 'cv', 'cx', 'cy', 'cz', 'dd', 'de', 'dj', 'dk',
      'dm', 'do', 'dz', 'ec', 'ee', 'eg', 'eh', 'er', 'es', 'et', 'eu', 'fi',
      'fj', 'fk', 'fm', 'fo', 'fr', 'ga', 'gb', 'gd', 'ge', 'gf', 'gg', 'gh',
      'gi', 'gl', 'gm', 'gn', 'gp', 'gq', 'gr', 'gs', 'gt', 'gu', 'gw', 'gy',
      'hk', 'hm', 'hn', 'hr', 'ht', 'hu', 'id', 'ie', 'il', 'im', 'in', 'io',
      'iq', 'ir', 'is', 'it', 'je', 'jm', 'jo', 'jp', 'ke', 'kg', 'kh', 'ki',
      'km', 'kn', 'kp', 'kr', 'kw', 'ky', 'kz', 'la', 'lb', 'lc', 'li', 'lk',
      'lr', 'ls', 'lt', 'lu', 'lv', 'ly', 'ma', 'mc', 'md', 'me', 'mg', 'mh',
      'mk', 'ml', 'mm', 'mn', 'mo', 'mp', 'mq', 'mr', 'ms', 'mt', 'mu', 'mv',
      'mw', 'mx', 'my', 'mz', 'na', 'nc', 'ne', 'nf', 'ng', 'ni', 'nl', 'no',
      'np', 'nr', 'nu', 'nz', 'om', 'pa', 'pe', 'pf', 'pg', 'ph', 'pk', 'pl',
      'pm', 'pn', 'pr', 'ps', 'pt', 'pw', 'py', 'qa', 're', 'ro', 'rs', 'ru',
      'rw', 'sa', 'sb', 'sc', 'sd', 'se', 'sg', 'sh', 'si', 'sj', 'sk', 'sl',
      'sm', 'sn', 'so', 'sr', 'ss', 'st', 'su', 'sv', 'sy', 'sz', 'tc', 'td',
      'tf', 'tg', 'th', 'tj', 'tk', 'tl', 'tm', 'tn', 'to', 'tp', 'tr', 'tt',
      'tv', 'tw', 'tz', 'ua', 'ug', 'uk', 'us', 'uy', 'uz', 'va', 'vc', 've',
      'vg', 'vi', 'vn', 'vu', 'wf', 'ws', 'ye', 'yt', 'yu', 'za', 'zm', 'zw',
  
      'about', 'access', 'account', 'accounts', 'ack', 'activate', 'add',
      'address', 'adm', 'admin', 'admins', 'administrator', 'administrators',
      'adult', 'advertising', 'affiliate', 'affiliates', 'ajax', 'alert',
      'alerts', 'all', 'analytics', 'anon', 'anonymous', 'api', 'app', 'apps',
      'archive', 'archives', 'auth', 'authentication', 'author', 'authorization',
      'authorizations', 'authorize', 'authors', 'avatar',
  
      'backup', 'banner', 'banners', 'bar', 'billing ', 'blog', 'blogs', 'board',
      'boards', 'bot', 'bots', 'branch', 'branches', 'bucket', 'buckets', 'bug',
      'bugs', 'business',
  
      'cache', 'cadastro', 'calendar', 'campaign', 'cancel', 'card', 'cards',
      'careers', 'cart', 'cfg', 'cfgs', 'changelog', 'chat', 'checkout', 'child',
      'children', 'client', 'clients', 'clip', 'clips', 'code', 'codereview',
      'comercial', 'compare', 'complaints', 'condition', 'conditions', 'conf',
      'config', 'configs', 'configuration', 'configurations', 'connect',
      'connection', 'connections', 'console', 'consoles', 'contact', 'contest',
      'copyright', 'copyrights', 'create', 'creator', 'creators',
  
      'dashboard', 'data', 'dmca', 'debug', 'debugger',
      'debuggers', 'delete', 'demo', 'design', 'designer', 'dev', 'dir',
      'direct_messages', 'directory', 'docs', 'documentation', 'domain',
      'download', 'downloads', 'dynamic', 'dynamo', 'dynamos', 'dyno', 'dynos',
  
      'ecommerce', 'edit', 'editor', 'email', 'embed', 'employment', 'enterprise',
      'event', 'events',
  
      'faq', 'favorite', 'favorites', 'feed', 'feedback', 'feeds', 'file',
      'files', 'firewall', 'firewalls', 'fleet', 'fleets', 'flog', 'follow',
      'followers', 'following', 'foo', 'forum', 'forums', 'free', 'friend',
      'friends',
  
      'gadget', 'gadgets', 'games', 'get', 'gist', 'gonzo', 'group', 'groups',
      'guest',
  
      'half', 'help', 'header', 'headers', 'heap', 'her', 'him', 'home',
      'homepage', 'host', 'hosts', 'hosting', 'hostmaster', 'hostname', 'hot',
      'hpg',
  
      'idea', 'ideas', 'image', 'images', 'img', 'index', 'indice', 'info',
      'information', 'insert', 'intranet', 'invitations', 'invite', 'ipad',
      'iphone',
  
      'job', 'jobs',
  
  
      'language', 'languages', 'leaf', 'leaves', 'list', 'lists', 'live', 'log',
      'login', 'logout', 'logs',
  
      'mailer', 'mailing', 'manager', 'map', 'maps', 'marketing', 'master',
      'masters', 'media', 'mention', 'mentions', 'message', 'messenger',
      'microblog', 'microblogs', 'mine', 'mis', 'mob', 'mobile', 'movie',
      'movies', 'msg', 'msn', 'music', 'myself',
  
      'name', 'named', 'net', 'network', 'new', 'news', 'newsletter', 'nick',
      'nickname', 'notes', 'notice', 'notices',
  
      'oauth', 'oauth2', 'oauth_clients', 'offers', 'offline', 'old', 'online',
      'openid', 'operator', 'option', 'options', 'orders', 'organizations',
      'owner', 'owners',
  
      'page', 'pager', 'pages', 'panel', 'parent', 'parents', 'password',
      'passwords', 'patch', 'patches', 'phishing', 'photo', 'photoalbum',
      'photos', 'pic', 'pics', 'plans', 'plugin', 'plugins', 'police', 'policy',
      'popular', 'port', 'ports', 'post', 'postfix', 'postmaster', 'postmasters',
      'posts', 'pp', 'price', 'prices', 'privacy', 'private', 'profile',
      'project', 'projects', 'promo', 'proof', 'pub', 'public', 'put',
  
      'quarter', 'que', 'queue', 'quit',
  
      'random', 'rc', 'recruitment', 'register', 'registration', 'remove',
      'replies', 'res', 'resources', 'rising', 'robots', 'root', 'roots', 'rules',
  
      'sample', 'samples',  'save', 'script', 'scripts',
      'search', 'secure', 'security', 'select', 'send', 'server', 'servers',
      'service', 'services', 'sessions', 'set', 'sets', 'setting', 'settings',
      'setup', 'shop', 'signin', 'signup', 'site', 'sitemap', 'sites', 'slave',
      'slaves', 'snake', 'source', 'sources', 'spam', 'spiders', 'src',
      'ssladmin', 'ssladministrator', 'sslwebmaster', 'stack', 'stage', 'staging',
      'stat', 'static', 'stats', 'status', 'store', 'stores', 'stories', 'style',
      'styleguide', 'styles', 'subdomain', 'subscribe', 'subscriptions',
      'support', 'syn', 'sync', 'sysadmin', 'sysadministrator', 'system',
  
      'tac', 'tag', 'tags', 'talk', 'task', 'tech',
      'temp', 'term', 'terms', 'test', 'test1', 'test2',
      'test3', 'tests', 'them', 'theme', 'themes', 'tmp', 'todo', 'token',
      'tokens', 'tool', 'tools', 'tos', 'tou', 'tour', 'trace', 'tracer',
      'tracers', 'traces', 'track', 'translation', 'translations', 'trend',
      'trends',
  
      'unfollow', 'unpopular', 'unsubscribe', 'update', 'updates', 'upload', 'url',
      'usage', 'user', 'users', 'username', 'usernames', 'usuario',
  
      'video', 'videos', 'visitor',
  
      'warning', 'warnings', 'weather', 'web', 'webmail', 'webmaster',
      'webmasters', 'website', 'websites', 'widget', 'widgets', 'wiki', 'win',
      'workshop',
  
      'xfn', 'xmpp', 'xpg','xxx',
  
      'you', 'yourname', 'yourself', 'yourusername', 'yoursite', 'yourdomain',
  ]
    return reservedWords.includes(username)
  }

  async function checkUsernameTaken(username) {
    const usersRef = collection(db, "users");
      const dataQuery = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(dataQuery);
      if (querySnapshot.docs[0]) {
        return true
      } else {
        return false
      }
  }

  async function isUsernameTaken(username) {
    const formattedUsername = username.toLowerCase()
    if (!checkUsernameReserved(formattedUsername)) {
      try {
        return await checkUsernameTaken(formattedUsername)
          .then((res) => {
            if (res) return true
            else return false
          })
      } catch {
        return true
      }
    } else {
      return true
    }
  }

  return { isUsernameTaken }
}
