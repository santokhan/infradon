const remote_api = import.meta.env.VITE_REMOTE_API || 'http://localhost:5984/';

function remote_db_url(db: string) {
  return remote_api + db;
}

export { remote_db_url, remote_api };
