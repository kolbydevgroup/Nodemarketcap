from bitcoinrpc.authproxy import AuthServiceProxy, JSONRPCException
import config
import json
	

def get_rpc(name):
    return AuthServiceProxy("http://%s:%s@%s:%s" % (
        config.coinname[str(name).lower()+'rpc_username'], config.coinname[str(name).lower()+'rpc_password'],
        config.coinname[str(name).lower()+'rpc_host'],
        config.coinname[str(name).lower()+'rpc_port']), timeout=config.coinname['timeout'])
		
def writeToJson(name, data):
	filePathNameWExt = '../html/' + name + '.json'
	with open(filePathNameWExt, 'w') as fp:
		json.dump(data, fp, indent=4)

def writeToJsonApi(name, data):
	filePathNameWExt = '../html/api/coin/' + name + '.json'
	with open(filePathNameWExt, 'w') as fp:
		json.dump(data, fp, indent=4)
		
def writeToJsonCompApi(name, data):
	filePathNameWExt = '../html/api/' + name + '.json'
	with open(filePathNameWExt, 'w') as fp:
		json.dump(data, fp, indent=4)
		
		
def cat_json(output_filename, input_filenames):
    with file(output_filename, "w") as outfile:
        first = True
        for infile_name in input_filenames:
            with file(infile_name) as infile:
                if first:
                    outfile.write('[')
                    first = False
                else:
                    outfile.write(',')
                outfile.write(mangle(infile.read()))
        outfile.write(']')		
		
def mangle(s):
    return s.strip()[1:-1]
