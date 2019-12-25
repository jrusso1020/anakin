---
title: Avoiding Webscraping Throttling Using Python and Tor as a Proxy
date: "2019-07-08"
description: In order to hide your IP address and to try and limit throttling when web scraping, it might be a good idea to use a proxy such as Tor. This post describes how to use Python based web scraping tools and Tor to hide yourself when scraping websites for data. However, it can also be used more broadly when using Python to make requests to hide your actual IP. I do not condone the use of this information for any illegal or illicit activity.
---

*Edited 2019-07-13 based on concerns*

## Disclaimer
*I do not condone the use of this information for creating illegal web crawlers. This was more an informational exercise and I wanted to share it with others. Another thing to note is that some sites are able to automatically block IP's that are Tor exit nodes, so this may not work for some sites that go to these measures.*

### The Problem
The other day I was starting the search for a new aparment in New York City, which I have done a couple of times now, and was frustrated that StreetEasy doesn't allow you to filter apartments that are available after a certain date. After a quick search I realized that people have been requesting this feature for [years](https://streeteasy.com/talk/discussion/40436-search-listing-available-after-date) (since Oct 2015 to be exact), and it was nowhere in sight and there didn't seem to be any services out there that did it either. So I had a thought, I used to web scrape sites using Python, why not try it on StreetEasy and filter the apartments myself. Spoiler alert I wasn't able to do this for a reason I will explain in more detail, but this led me to use a lot of old tools I hadn't used in a while and come up with a script for scraping through Tor and switching IP's between requests.

### The Roadblock
So first let me quickly describe the reason I wasn't able to scrape StreetEasy. At first glance, there appeared to be a few different StreetEasy scraping scripts on Github. However, I thought it was simple enough I'd prefer to do it myself. It had been a while since I had scraped sites and I wanted to do it all (mostly) on my own. However, the first task in my iterative approach was to just get a listing page for a StreetEasy search. This quickly led me to receive the following html

```html
<body background="" style="margin: 0; padding: 0; font-family:Arial,FreeSans,sans-serif">
<table cellpadding="0" cellspacing="0" style="width: 100%; margin-top: 10px; margin-left: 0"><tbody><tr><td style="padding: 12px 2%;">
<table cellpadding="0" cellspacing="0" style="margin: 0 auto; width: 96%;"><tbody><tr><td style="padding: 12px 2%;">
<div><img src="http://streeteasy-public.s3.amazonaws.com/StreetEasy_logo_blue.png" width="450px"/><br/><br/></div>
<div>
<h2 style="margin-top: 0;">Pardon Our Interruption</h2>
<p>As you were browsing, something about your browser
        made us think you were a bot. There are a few reasons why this might happen:</p>
<ul>
<li>You're a power user moving through this website with super-human speed</li>
<li>You've disabled JavaScript in your web browser</li>
<li>A third-party browser plugin, such as Ghostery or NoScript, is preventing JavaScript from running.
          Additional information is available in this <a href="http://ds.tl/help-third-party-plugins" target="_blank" title="Third party browser plugins that block javascript">support article.</a></li>
</ul>
<p>After completing the CAPTCHA below, you will immediately regain access to the site.</p>
</div>
```

My initial thought was since I was using the `requests` library that I wasn't rendering JavaScript so after doing some googling I came across two ways to render JavaScript in Python. I could use the new `requests-html` library or I could use `selenium`. However, I quickly realized neither was able to give me the result I wanted, I was still getting the same html page that said "Pardon Our Interruption". So now I decided to take a closer look at the scraping scripts I saw on [Github])(https://github.com/purcelba/streeteasy_scrape) earlier. A few of them had warnings about how their scripts no longer worked because StreetEasy started using [Distil Networks](https://www.distilnetworks.com/) to protect them from unwanted bots and web scrapers. After a couple of google searches, I quickly realized I wasn't going to break through Distil Networks checks very easily and decided to table the web scraping of StreetEasy. Nevertheless, I had come back to web scraping after years and was interested in what I could do with it.

### The Final Result
When I initially thought I was going to web scrape StreetEasy, I wanted a way to do it without getting throttled because I knew I was going to have to go to a lot of individual listing pages to get information. I originally thought this was going to be the biggest problem for me to overcome so I put some thought into it. While in college, I had done some research on [Tor](https://www.torproject.org/) and the dark web under [Soumya Basu](http://www.soumyabasu.com/). A brief synopsis of Tor without getting into two much detail is that it's an onion router. Tor itself stands for The Onion Router (big surprise I know). What Tor does is it routes your traffic through multiple nodes(computers/servers) in a circuit, and then when your HTTP request reaches your end server it looks like it came from the last node in the Tor circuit. Generally there are three hops in the circuit, and it will send your request to a node then that node only knows where to send the message to next until you reach your final destination like google.com. How it does that is by encrypting your request in multiple layers, and at each node a layer is decrypted so it knows where to send the request next until we reach the last(exit) node and the entire message is decrypted and it knows what request you are looking to make. Then the traffic is rerouted back through all the nodes in a similar way until it reaches you. The reason it's called an onion router is because of the decryption and peeling away of the message at each node (like an onion).

Through my research I had become acquainted with the [Stem](https://stem.torproject.org/) Python package that would allow you to interact with Tor in Python. I knew you could use Tor as a proxy and route your HTTP requests through it in Python, so I thought this could be a good solution to the throttling problem. I imagined the throttling would be IP based, so I could use Tor and change my exit node between requests so that my web scraper wasn't throttled. However, this ended not being the biggest problem I had sadly.

Still, I wanted to give it a go because I thought it could be an interesting application in theory. So the general idea behind it was as follows
1. Run Tor on your computer
2. Use Tor as a proxy for selenium in Python
3. Make a request to a website
4. Request a new end node/circuit from Tor
5. Repeat steps 3 and 4 until all your requests are made

The code for this is as follows (I saved this as a file called scrape.py and ran it as `python scrape.py`). This was developed using python 3.7.2 (I use [Anaconda](https://www.anaconda.com/) and conda for Python version management)
```python
from stem import Signal
from stem.control import Controller
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from bs4 import BeautifulSoup

# signal TOR for a new connection
def switchIP():
    with Controller.from_port(port = 9051) as controller:
        controller.authenticate()
        controller.signal(Signal.NEWNYM)

# get a new selenium webdriver with tor as the proxy
def my_proxy(PROXY_HOST,PROXY_PORT):
    fp = webdriver.FirefoxProfile()
    # Direct = 0, Manual = 1, PAC = 2, AUTODETECT = 4, SYSTEM = 5
    fp.set_preference("network.proxy.type", 1)
    fp.set_preference("network.proxy.socks",PROXY_HOST)
    fp.set_preference("network.proxy.socks_port",int(PROXY_PORT))
    fp.update_preferences()
    options = Options()
    options.headless = True
    return webdriver.Firefox(options=options, firefox_profile=fp)

for x in range(10):
    proxy = my_proxy("127.0.0.1", 9050)
    proxy.get("https://whatsmyip.com/")
    html = proxy.page_source
    soup = BeautifulSoup(html, 'lxml')
    print(soup.find("span", {"id": "ipv4"}))
    print(soup.find("span", {"id": "ipv6"}))
    switchIP()
```

Before starting there are some requirements
1. Install Tor on your computer, for macs this can be accomplished using homebrew `brew install tor`. You can then run it constantly in the background using the command `brew services start tor` or run it manually using the command `tor`.
2. Make sure you have firefox installed on your computer, this will be required if you want to use the same selenium code above. You can use other browsers but the `my_proxy` method will need to change slightly
3. Install selenium, stem, and beautiful soup Python libraries using the command `pip install selenium stem bs4`
4. You will also need to update your `torrc` and restart Tor so that you can make requests to the Tor controller. On a mac you can find your `torrc` file at `/usr/local/etc/tor/torrc.sample`. Rename it to `torrc` by doing `mv /usr/local/etc/tor/torrc.sample /usr/local/etc/tor/torrc` and then uncomment the following lines (I will copy the full torrc at the bottom of this post)
```
ControlPort 9051
CookieAuthentication 1
```

Now let's talk about the code a little

```python
# signal TOR for a new connection
def switchIP():
    with Controller.from_port(port = 9051) as controller:
        controller.authenticate()
        controller.signal(Signal.NEWNYM)
```
This method is what allows us to switch our IP. It issues a signal (`Signal.NEWNYM`) to the Tor Controller Port, which tells Tor that we want a new circuit for traffic to be routed through. This will give us a new exit node which means our traffic looks like it's coming from a different IP.

```python
# get a new selenium webdriver with tor as the proxy
def my_proxy(PROXY_HOST, PROXY_PORT):
    fp = webdriver.FirefoxProfile()
    # Direct = 0, Manual = 1, PAC = 2, AUTODETECT = 4, SYSTEM = 5
    fp.set_preference("network.proxy.type", 1)
    fp.set_preference("network.proxy.socks",PROXY_HOST)
    fp.set_preference("network.proxy.socks_port",int(PROXY_PORT))
    fp.update_preferences()
    options = Options()
    options.headless = True
    return webdriver.Firefox(options=options, firefox_profile=fp)
```
This method sets up our selenium webdriver to use the Firefox browser in headless mode and to use Tor as a proxy to route our traffic through. This ensures that all of our requests to our selenium webdriver go through Tor and look like they are coming from our exit node.

```python
for x in range(10):
    proxy = my_proxy("127.0.0.1", 9050)
    proxy.get("https://whatsmyip.com/")
    html = proxy.page_source
    soup = BeautifulSoup(html, 'lxml')
    print(soup.find("span", {"id": "ipv4"}))
    print(soup.find("span", {"id": "ipv6"}))
    switchIP()
```
This last bit of code just sends a request to https://whatsmyip.com/ so that we can check the IP of our request through our selenium webdriver. We print out the ipv4 and ipv6 addresses of the exit node of our Tor circuit because sometimes it's ipv4 and sometimes it's ipv6. Then after that we request a new IP by requesting a new Tor circuit to be built. If everything goes well you should get a result in your terminal that looks something like
```
<span class="pull-right" id="ipv4">2a0b:f4c1::7</span>
None
<span class="pull-right" id="ipv4">Your IPv4: Not Detected</span>
<span class="pull-right" id="ipv6">2620:7:6001::ffff:c759:e64c</span>
<span class="pull-right" id="ipv4">2001:67c:2608::1</span>
None
<span class="pull-right" id="ipv4">2a0b:f4c1::7</span>
None
<span class="pull-right" id="ipv4">Your IPv4: Not Detected</span>
<span class="pull-right" id="ipv6">2a03:e600:100::15</span>
<span class="pull-right" id="ipv4">Your IPv4: Not Detected</span>
<span class="pull-right" id="ipv6">2001:620:20d0::24</span>
<span class="pull-right" id="ipv4">Your IPv4: Not Detected</span>
<span class="pull-right" id="ipv6">2a00:1768:1001:21::32a3:201a</span>
<span class="pull-right" id="ipv4">Your IPv4: Not Detected</span>
<span class="pull-right" id="ipv6">2a03:e600:100::19</span>
<span class="pull-right" id="ipv4">Your IPv4: Not Detected</span>
<span class="pull-right" id="ipv6">2a03:e600:100::1c</span>
<span class="pull-right" id="ipv4">2a0b:f4c1::7</span>
None
```
As you can see my IP address changes between calls, which is exactly what we are looking for. The server we are making the request to thinks that we are the Tor exit node, and each request we made looks like it's coming from a different computer. The `None` values are because if you have an ipv4 value than it doesn't show anything for `ipv6`.

And just like that you can hide your real IP when making HTTP requests using Python. I hope this is hepful, and if you have any questions or corrections feel free to leave a comment below!

### Additional Resources
1. https://hackernoon.com/web-scraping-tutorial-with-python-tips-and-tricks-db070e70e071
2. https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-python.html
3. https://stackoverflow.com/questions/30286293/make-requests-using-python-over-tor
4. https://www.thedurkweb.com/automated-anonymous-interactions-with-websites-using-python-and-tor/
5. https://stem.torproject.org/tutorials/examples/exit_used.html
6. https://stackoverflow.com/questions/15459170/trouble-authenticating-tor-with-python

### Full Torrc
```
## Configuration file for a typical Tor user
## Last updated 22 December 2017 for Tor 0.3.2.8-rc.
## (may or may not work for much older or much newer versions of Tor.)
##
## Lines that begin with "## " try to explain what's going on. Lines
## that begin with just "#" are disabled commands: you can enable them
## by removing the "#" symbol.
##
## See 'man tor', or https://www.torproject.org/docs/tor-manual.html,
## for more options you can use in this file.
##
## Tor will look for this file in various places based on your platform:
## https://www.torproject.org/docs/faq#torrc

## Tor opens a SOCKS proxy on port 9050 by default -- even if you don't
## configure one below. Set "SOCKSPort 0" if you plan to run Tor only
## as a relay, and not make any local application connections yourself.
#SOCKSPort 9050 # Default: Bind to localhost:9050 for local connections.
#SOCKSPort 192.168.0.1:9100 # Bind to this address:port too.

## Entry policies to allow/deny SOCKS requests based on IP address.
## First entry that matches wins. If no SOCKSPolicy is set, we accept
## all (and only) requests that reach a SOCKSPort. Untrusted users who
## can access your SOCKSPort may be able to learn about the connections
## you make.
#SOCKSPolicy accept 192.168.0.0/16
#SOCKSPolicy accept6 FC00::/7
#SOCKSPolicy reject *

## Logs go to stdout at level "notice" unless redirected by something
## else, like one of the below lines. You can have as many Log lines as
## you want.
##
## We advise using "notice" in most cases, since anything more verbose
## may provide sensitive information to an attacker who obtains the logs.
##
## Send all messages of level 'notice' or higher to /usr/local/var/log/tor/notices.log
#Log notice file /usr/local/var/log/tor/notices.log
## Send every possible message to /usr/local/var/log/tor/debug.log
#Log debug file /usr/local/var/log/tor/debug.log
## Use the system log instead of Tor's logfiles
#Log notice syslog
## To send all messages to stderr:
#Log debug stderr

## Uncomment this to start the process in the background... or use
## --runasdaemon 1 on the command line. This is ignored on Windows;
## see the FAQ entry if you want Tor to run as an NT service.
#RunAsDaemon 1

## The directory for keeping all the keys/etc. By default, we store
## things in $HOME/.tor on Unix, and in Application Data\tor on Windows.
#DataDirectory /usr/local/var/lib/tor

## The port on which Tor will listen for local connections from Tor
## controller applications, as documented in control-spec.txt.
ControlPort 9051
## If you enable the controlport, be sure to enable one of these
## authentication methods, to prevent attackers from accessing it.
#HashedControlPassword 16:872860B76453A77D60CA2BB8C1A7042072093276A3D701AD684053EC4C
CookieAuthentication 1

############### This section is just for location-hidden services ###

## Once you have configured a hidden service, you can look at the
## contents of the file ".../hidden_service/hostname" for the address
## to tell people.
##
## HiddenServicePort x y:z says to redirect requests on port x to the
## address y:z.

#HiddenServiceDir /usr/local/var/lib/tor/hidden_service/
#HiddenServicePort 80 127.0.0.1:80

#HiddenServiceDir /usr/local/var/lib/tor/other_hidden_service/
#HiddenServicePort 80 127.0.0.1:80
#HiddenServicePort 22 127.0.0.1:22

################ This section is just for relays #####################
#
## See https://www.torproject.org/docs/tor-doc-relay for details.

## Required: what port to advertise for incoming Tor connections.
#ORPort 9001
## If you want to listen on a port other than the one advertised in
## ORPort (e.g. to advertise 443 but bind to 9090), you can do it as
## follows.  You'll need to do ipchains or other port forwarding
## yourself to make this work.
#ORPort 443 NoListen
#ORPort 127.0.0.1:9090 NoAdvertise

## The IP address or full DNS name for incoming connections to your
## relay. Leave commented out and Tor will guess.
#Address noname.example.com

## If you have multiple network interfaces, you can specify one for
## outgoing traffic to use.
## OutboundBindAddressExit will be used for all exit traffic, while
## OutboundBindAddressOR will be used for all OR and Dir connections
## (DNS connections ignore OutboundBindAddress).
## If you do not wish to differentiate, use OutboundBindAddress to
## specify the same address for both in a single line.
#OutboundBindAddressExit 10.0.0.4
#OutboundBindAddressOR 10.0.0.5

## A handle for your relay, so people don't have to refer to it by key.
## Nicknames must be between 1 and 19 characters inclusive, and must
## contain only the characters [a-zA-Z0-9].
## If not set, "Unnamed" will be used.
#Nickname ididnteditheconfig

## Define these to limit how much relayed traffic you will allow. Your
## own traffic is still unthrottled. Note that RelayBandwidthRate must
## be at least 75 kilobytes per second.
## Note that units for these config options are bytes (per second), not
## bits (per second), and that prefixes are binary prefixes, i.e. 2^10,
## 2^20, etc.
#RelayBandwidthRate 100 KBytes  # Throttle traffic to 100KB/s (800Kbps)
#RelayBandwidthBurst 200 KBytes # But allow bursts up to 200KB (1600Kb)

## Use these to restrict the maximum traffic per day, week, or month.
## Note that this threshold applies separately to sent and received bytes,
## not to their sum: setting "40 GB" may allow up to 80 GB total before
## hibernating.
##
## Set a maximum of 40 gigabytes each way per period.
#AccountingMax 40 GBytes
## Each period starts daily at midnight (AccountingMax is per day)
#AccountingStart day 00:00
## Each period starts on the 3rd of the month at 15:00 (AccountingMax
## is per month)
#AccountingStart month 3 15:00

## Administrative contact information for this relay or bridge. This line
## can be used to contact you if your relay or bridge is misconfigured or
## something else goes wrong. Note that we archive and publish all
## descriptors containing these lines and that Google indexes them, so
## spammers might also collect them. You may want to obscure the fact that
## it's an email address and/or generate a new address for this purpose.
##
## If you are running multiple relays, you MUST set this option.
##
#ContactInfo Random Person <nobody AT example dot com>
## You might also include your PGP or GPG fingerprint if you have one:
#ContactInfo 0xFFFFFFFF Random Person <nobody AT example dot com>

## Uncomment this to mirror directory information for others. Please do
## if you have enough bandwidth.
#DirPort 9030 # what port to advertise for directory connections
## If you want to listen on a port other than the one advertised in
## DirPort (e.g. to advertise 80 but bind to 9091), you can do it as
## follows.  below too. You'll need to do ipchains or other port
## forwarding yourself to make this work.
#DirPort 80 NoListen
#DirPort 127.0.0.1:9091 NoAdvertise
## Uncomment to return an arbitrary blob of html on your DirPort. Now you
## can explain what Tor is if anybody wonders why your IP address is
## contacting them. See contrib/tor-exit-notice.html in Tor's source
## distribution for a sample.
#DirPortFrontPage /usr/local/etc/tor/tor-exit-notice.html

## Uncomment this if you run more than one Tor relay, and add the identity
## key fingerprint of each Tor relay you control, even if they're on
## different networks. You declare it here so Tor clients can avoid
## using more than one of your relays in a single circuit. See
## https://www.torproject.org/docs/faq#MultipleRelays
## However, you should never include a bridge's fingerprint here, as it would
## break its concealability and potentially reveal its IP/TCP address.
##
## If you are running multiple relays, you MUST set this option.
##
## Note: do not use MyFamily on bridge relays.
#MyFamily $keyid,$keyid,...

## Uncomment this if you do *not* want your relay to allow any exit traffic.
## (Relays allow exit traffic by default.)
#ExitRelay 0

## Uncomment this if you want your relay to allow IPv6 exit traffic.
## (Relays only allow IPv4 exit traffic by default.)
#IPv6Exit 1

## A comma-separated list of exit policies. They're considered first
## to last, and the first match wins.
##
## If you want to allow the same ports on IPv4 and IPv6, write your rules
## using accept/reject *. If you want to allow different ports on IPv4 and
## IPv6, write your IPv6 rules using accept6/reject6 *6, and your IPv4 rules
## using accept/reject *4.
##
## If you want to _replace_ the default exit policy, end this with either a
## reject *:* or an accept *:*. Otherwise, you're _augmenting_ (prepending to)
## the default exit policy. Leave commented to just use the default, which is
## described in the man page or at
## https://www.torproject.org/documentation.html
##
## Look at https://www.torproject.org/faq-abuse.html#TypicalAbuses
## for issues you might encounter if you use the default exit policy.
##
## If certain IPs and ports are blocked externally, e.g. by your firewall,
## you should update your exit policy to reflect this -- otherwise Tor
## users will be told that those destinations are down.
##
## For security, by default Tor rejects connections to private (local)
## networks, including to the configured primary public IPv4 and IPv6 addresses,
## and any public IPv4 and IPv6 addresses on any interface on the relay.
## See the man page entry for ExitPolicyRejectPrivate if you want to allow
## "exit enclaving".
##
#ExitPolicy accept *:6660-6667,reject *:* # allow irc ports on IPv4 and IPv6 but no more
#ExitPolicy accept *:119 # accept nntp ports on IPv4 and IPv6 as well as default exit policy
#ExitPolicy accept *4:119 # accept nntp ports on IPv4 only as well as default exit policy
#ExitPolicy accept6 *6:119 # accept nntp ports on IPv6 only as well as default exit policy
#ExitPolicy reject *:* # no exits allowed

## Bridge relays (or "bridges") are Tor relays that aren't listed in the
## main directory. Since there is no complete public list of them, even an
## ISP that filters connections to all the known Tor relays probably
## won't be able to block all the bridges. Also, websites won't treat you
## differently because they won't know you're running Tor. If you can
## be a real relay, please do; but if not, be a bridge!
##
## Warning: when running your Tor as a bridge, make sure than MyFamily is
## NOT configured.
#BridgeRelay 1
## By default, Tor will advertise your bridge to users through various
## mechanisms like https://bridges.torproject.org/. If you want to run
## a private bridge, for example because you'll give out your bridge
## address manually to your friends, uncomment this line:
#PublishServerDescriptor 0

## Configuration options can be imported from files or folders using the %include
## option with the value being a path. If the path is a file, the options from the
## file will be parsed as if they were written where the %include option is. If
## the path is a folder, all files on that folder will be parsed following lexical
## order. Files starting with a dot are ignored. Files on subfolders are ignored.
## The %include option can be used recursively.
#%include /etc/torrc.d/
#%include /etc/torrc.custom
```
