#!/bin/sh
eval "$(ssh-agent -s)"
echo '
echo $SSH_KEY | base64 --decode | xxd -r > /tmp/__
chmod 600 /tmp/__
echo $SSH_PASS | DISPLAY= ssh-add /tmp/__
rm /tmp/__

git config --global user.name "Travis CI"
git config --global user.email "wapidstyle@live.ca"
# Stage 1 complete
' | grep -ve '^$' | awk '{print "% "$0}' | tee /dev/stderr | tr -d '%' | sh
echo '
# Restarted command line
cd ..
git clone git+ssh://git@github.com/thatlittlegit/betterelement.git be_tmp
cd be_tmp
git checkout gh-pages
npm run docs
mv out/* .
git diff > /tmp/_ && cat /tmp/_ ### Git diff
git commit -a -m "Automated TravisCI push [ci skip]"
#
git push origin gh-pages
# Finished!
' | grep -ve '^$' | awk '{print "% "$0}' | tee /dev/stderr | tr -d '%' | sh
