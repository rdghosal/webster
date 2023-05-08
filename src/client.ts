type Cached = Record<string, number | string | Date>

type Memcache = {
    [ collection: string ]: Cached[]
}

class MockDb {
    private memcache: Memcache;

    constructor() {
        this.memcache = {};
    };

    public write(collection: string, ...records: Cached[]): void {
        if (!(collection in this.memcache)) {
            this.memcache[collection] = [];
        }
        this.memcache[collection].push(...records);
    };

    public read(collection: string): Cached[] {
        return this.memcache[collection];
    };
};

export default MockDb;
